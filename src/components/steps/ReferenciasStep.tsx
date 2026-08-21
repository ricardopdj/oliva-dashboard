import { cardStyle, TOKENS } from "../../styles/tokens";
import { REFERENCIAS_Q } from "../../data/questions";
import { useBriefing } from "../../state/useBriefing";
import { TextField } from "../TextField";

export function ReferenciasStep() {
  const { referencias, setReferencias, audio, recordingId, toggleRecord } = useBriefing();

  return (
    <div className="oliva-card" style={cardStyle}>
      <span className="oliva-badge">05</span>
      <h2 className="oliva-display" style={{ fontSize: 26, color: TOKENS.black, margin: "0 0 20px" }}>referências</h2>
      {REFERENCIAS_Q.map((q) => (
        <TextField key={q.id} label={q.label} value={referencias[q.id]} onChange={(v) => setReferencias({ ...referencias, [q.id]: v })}
          audioUrl={audio[q.id]} recording={recordingId === q.id}
          onRecordToggle={() => toggleRecord(q.id, referencias[q.id] || "", (text) => setReferencias((prev) => ({ ...prev, [q.id]: text })))} />
      ))}
    </div>
  );
}
