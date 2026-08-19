import { useCallback, useEffect, useRef, useState } from "react";
import { deleteAudioBlob, loadAllAudioBlobs, saveAudioBlob } from "../lib/db";

const MAX_RECORDING_MS = 120_000;
const AUDIO_BITS_PER_SECOND = 32_000;

export function useAudioRecorder() {
  const [audio, setAudio] = useState<Record<string, string>>({});
  const [audioBlobs, setAudioBlobs] = useState<Record<string, Blob>>({});
  const [recordingId, setRecordingId] = useState<string | null>(null);
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const maxDurationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadAllAudioBlobs().then((blobs) => {
      if (cancelled) return;
      const urls: Record<string, string> = {};
      Object.entries(blobs).forEach(([qid, blob]) => { urls[qid] = URL.createObjectURL(blob); });
      setAudio(urls);
      setAudioBlobs(blobs);
    });
    return () => { cancelled = true; };
  }, []);

  const toggleRecord = useCallback(async (qid: string) => {
    if (recordingId === qid) {
      mediaRef.current?.stop();
      if (maxDurationTimerRef.current) clearTimeout(maxDurationTimerRef.current);
      setRecordingId(null);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream, { audioBitsPerSecond: AUDIO_BITS_PER_SECOND });
      chunksRef.current = [];
      rec.ondataavailable = (e) => chunksRef.current.push(e.data);
      rec.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudio((prev) => ({ ...prev, [qid]: url }));
        setAudioBlobs((prev) => ({ ...prev, [qid]: blob }));
        saveAudioBlob(qid, blob);
        stream.getTracks().forEach((t) => t.stop());
      };
      rec.start();
      mediaRef.current = rec;
      setRecordingId(qid);
      maxDurationTimerRef.current = setTimeout(() => {
        rec.stop();
        setRecordingId(null);
      }, MAX_RECORDING_MS);
    } catch {
      alert("Não foi possível acessar o microfone. Verifique a permissão do navegador.");
    }
  }, [recordingId]);

  const resetAudio = useCallback(() => {
    setAudio({});
    setAudioBlobs({});
    setRecordingId(null);
  }, []);

  const removeAudio = useCallback((qid: string) => {
    setAudio((prev) => {
      const next = { ...prev };
      delete next[qid];
      return next;
    });
    setAudioBlobs((prev) => {
      const next = { ...prev };
      delete next[qid];
      return next;
    });
    deleteAudioBlob(qid);
  }, []);

  return { audio, audioBlobs, recordingId, toggleRecord, resetAudio, removeAudio, maxRecordingMs: MAX_RECORDING_MS };
}
