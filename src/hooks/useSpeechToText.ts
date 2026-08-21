import { useCallback, useEffect, useRef, useState } from "react";
import { getSpeechRecognitionCtor } from "../lib/speechRecognition";

// Mirrors useAudioRecorder's safety net — not a real limit for the user,
// just protection against a mic left on by accident.
const SAFETY_MAX_RECORDING_MS = 20 * 60_000;

const IGNORED_ERRORS = new Set(["no-speech", "aborted"]);

export function useSpeechToText() {
  const [recordingId, setRecordingId] = useState<string | null>(null);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const sessionRef = useRef(0);
  const manualStopRef = useRef(false);
  const baseTextRef = useRef("");
  const finalTextRef = useRef("");
  const onTranscriptChangeRef = useRef<(text: string) => void>(() => {});
  const maxDurationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Speech-to-text never produces a blob — kept empty and reference-stable
  // (never set again) so submitBriefing()'s Object.entries(audioBlobs) is a no-op.
  const [audio] = useState<Record<string, string>>({});
  const [audioBlobs] = useState<Record<string, Blob>>({});

  const clearMaxDurationTimer = useCallback(() => {
    if (maxDurationTimerRef.current) {
      clearTimeout(maxDurationTimerRef.current);
      maxDurationTimerRef.current = null;
    }
  }, []);

  const stop = useCallback(() => {
    manualStopRef.current = true;
    clearMaxDurationTimer();
    recognitionRef.current?.stop();
    setRecordingId(null);
  }, [clearMaxDurationTimer]);

  const resetAudio = useCallback(() => {
    sessionRef.current += 1;
    manualStopRef.current = true;
    clearMaxDurationTimer();
    recognitionRef.current?.abort();
    recognitionRef.current = null;
    setRecordingId(null);
  }, [clearMaxDurationTimer]);

  const toggleRecord = useCallback((qid: string, currentValue: string, onTranscriptChange: (text: string) => void) => {
    if (recordingId === qid) {
      stop();
      return;
    }

    const Ctor = getSpeechRecognitionCtor();
    if (!Ctor) {
      alert("Este navegador não suporta ditado por voz.");
      return;
    }

    // Abandon any previous session (switching fields mid-dictation) so its
    // onend/onresult can't restart itself or write into the new field.
    sessionRef.current += 1;
    const mySession = sessionRef.current;
    clearMaxDurationTimer();
    recognitionRef.current?.abort();

    const recognition = new Ctor();
    recognition.lang = "pt-BR";
    recognition.continuous = true;
    recognition.interimResults = true;

    baseTextRef.current = currentValue ? `${currentValue} ` : "";
    finalTextRef.current = "";
    onTranscriptChangeRef.current = onTranscriptChange;
    manualStopRef.current = false;

    recognition.onresult = (event) => {
      if (sessionRef.current !== mySession) return;
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0].transcript;
        if (result.isFinal) finalTextRef.current += `${transcript} `;
        else interim += transcript;
      }
      onTranscriptChangeRef.current(`${baseTextRef.current}${finalTextRef.current}${interim}`.trim());
    };

    recognition.onerror = (event) => {
      if (sessionRef.current !== mySession) return;
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        manualStopRef.current = true;
        alert("Não foi possível acessar o microfone. Verifique a permissão do navegador.");
      } else if (event.error === "network") {
        manualStopRef.current = true;
        alert("Não foi possível transcrever: sem conexão com o serviço de reconhecimento de voz.");
      } else if (!IGNORED_ERRORS.has(event.error)) {
        manualStopRef.current = true;
        alert("O ditado por voz parou por um erro inesperado. Tente novamente.");
      }
      // no-speech / aborted are ignored — onend's auto-restart covers them.
    };

    recognition.onend = () => {
      if (sessionRef.current !== mySession) return;
      if (manualStopRef.current) {
        recognitionRef.current = null;
        setRecordingId(null);
        return;
      }
      // Chrome silently ends the session after a pause in speech — restart
      // to keep dictation feeling continuous until the user stops it.
      try {
        recognition.start();
      } catch {
        setRecordingId(null);
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
    setRecordingId(qid);
    maxDurationTimerRef.current = setTimeout(stop, SAFETY_MAX_RECORDING_MS);
  }, [recordingId, stop, clearMaxDurationTimer]);

  useEffect(() => {
    return () => {
      sessionRef.current += 1;
      recognitionRef.current?.abort();
      if (maxDurationTimerRef.current) clearTimeout(maxDurationTimerRef.current);
    };
  }, []);

  return { audio, audioBlobs, recordingId, toggleRecord, resetAudio };
}
