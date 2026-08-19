import { useCallback, useRef, useState } from "react";

export function useAudioRecorder() {
  const [audio, setAudio] = useState<Record<string, string>>({});
  const [recordingId, setRecordingId] = useState<string | null>(null);
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  const toggleRecord = useCallback(async (qid: string) => {
    if (recordingId === qid) {
      mediaRef.current?.stop();
      setRecordingId(null);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      chunksRef.current = [];
      rec.ondataavailable = (e) => chunksRef.current.push(e.data);
      rec.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudio((prev) => ({ ...prev, [qid]: url }));
        stream.getTracks().forEach((t) => t.stop());
      };
      rec.start();
      mediaRef.current = rec;
      setRecordingId(qid);
    } catch {
      alert("Não foi possível acessar o microfone. Verifique a permissão do navegador.");
    }
  }, [recordingId]);

  const resetAudio = useCallback(() => {
    setAudio({});
    setRecordingId(null);
  }, []);

  return { audio, recordingId, toggleRecord, resetAudio };
}
