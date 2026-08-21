import { cardStyle, TOKENS } from "../../styles/tokens";
import { DIFERENCIAIS_Q } from "../../data/questions";
import { useBriefing } from "../../state/useBriefing";
import { TextField } from "../TextField";

export function DiferenciaisStep() {
  const { diferenciais, setDiferenciais, audio, recordingId, toggleRecord } = useBriefing();

  return (
    <div className="oliva-card" style={cardStyle}>
      <span className="oliva-badge">04</span>
      <h2 className="oliva-display" style={{ fontSize: 26, color: TOKENS.black, margin: "0 0 4px" }}>diferenciais</h2>
      <p style={{ fontSize: 13, color: TOKENS.inkSoft, marginBottom: 18 }}>Modo fofoca, sem vergonha.</p>
      {DIFERENCIAIS_Q.map((q) => (
        <TextField key={q.id} label={q.label} value={diferenciais[q.id]} onChange={(v) => setDiferenciais({ ...diferenciais, [q.id]: v })}
          audioUrl={audio[q.id]} recording={recordingId === q.id}
          onRecordToggle={() => toggleRecord(q.id, diferenciais[q.id] || "", (text) => setDiferenciais((prev) => ({ ...prev, [q.id]: text })))} />
      ))}
    </div>
  );
}
