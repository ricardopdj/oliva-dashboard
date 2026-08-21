import { Mic, Square } from "lucide-react";
import { TOKENS } from "../styles/tokens";
import { SPEECH_RECOGNITION_SUPPORTED } from "../lib/speechRecognition";

interface TextFieldProps {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  audioUrl?: string;
  onRecordToggle?: () => void;
  recording?: boolean;
  rows?: number;
}

export function TextField({ label, value, onChange, audioUrl, onRecordToggle, recording, rows = 3 }: TextFieldProps) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "block", fontSize: 14, color: TOKENS.ink, marginBottom: 6, fontWeight: 500 }}>
        {label}
      </label>
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={SPEECH_RECOGNITION_SUPPORTED
          ? "Escreva à vontade, ou dite em voz alta ao lado."
          : "Escreva à vontade, ou grave um áudio ao lado."}
        style={{
          width: "100%", padding: "10px 12px", borderRadius: 10,
          border: `1px solid ${TOKENS.hair}`, fontSize: 14, color: TOKENS.ink,
          fontFamily: "inherit", resize: "vertical", background: "#FCFBF8",
        }}
      />
      {onRecordToggle && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6 }}>
          <button
            onClick={onRecordToggle}
            style={{
              display: "flex", alignItems: "center", gap: 6, fontSize: 12,
              padding: "5px 10px", borderRadius: 999, border: `1px solid ${recording ? "#C25B4A" : TOKENS.hair}`,
              background: recording ? "#FBEAE6" : "#fff", color: recording ? "#C25B4A" : TOKENS.inkSoft,
              cursor: "pointer",
            }}
          >
            {recording ? <Square size={12} /> : <Mic size={12} />}
            {recording
              ? "Parar gravação"
              : SPEECH_RECOGNITION_SUPPORTED ? "Responder por voz" : "Responder com áudio"}
          </button>
          {recording && (
            <span style={{ fontSize: 11, color: TOKENS.inkSoft }}>
              {SPEECH_RECOGNITION_SUPPORTED ? "transcrevendo…" : "gravando…"}
            </span>
          )}
          {audioUrl && <audio controls src={audioUrl} style={{ height: 30 }} />}
        </div>
      )}
    </div>
  );
}
