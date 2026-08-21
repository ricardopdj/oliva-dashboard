import { cardStyle, TOKENS } from "../../styles/tokens";
import { PUBLICO_Q } from "../../data/questions";
import { useBriefing } from "../../state/useBriefing";
import { TextField } from "../TextField";

export function PublicoStep() {
  const { publico, setPublico, audio, recordingId, toggleRecord } = useBriefing();

  return (
    <div className="oliva-card" style={cardStyle}>
      <span className="oliva-badge">03</span>
      <h2 className="oliva-display" style={{ fontSize: 26, color: TOKENS.black, margin: "0 0 20px" }}>sobre o público</h2>
      {PUBLICO_Q.map((q) => (
        <TextField key={q.id} label={q.label} value={publico[q.id]} onChange={(v) => setPublico({ ...publico, [q.id]: v })}
          audioUrl={audio[q.id]} recording={recordingId === q.id}
          onRecordToggle={() => toggleRecord(q.id, publico[q.id] || "", (text) => setPublico((prev) => ({ ...prev, [q.id]: text })))} />
      ))}
    </div>
  );
}
