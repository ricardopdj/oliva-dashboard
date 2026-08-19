import { cardStyle, TOKENS } from "../../styles/tokens";
import { EMPRESA_Q } from "../../data/questions";
import { useBriefing } from "../../state/useBriefing";
import { TextField } from "../TextField";

export function EmpresaStep() {
  const { empresa, setEmpresa, audio, recordingId, toggleRecord } = useBriefing();

  return (
    <div style={cardStyle}>
      <span className="oliva-badge">02</span>
      <h2 className="oliva-display" style={{ fontSize: 26, color: TOKENS.black, margin: "0 0 20px" }}>sobre a empresa</h2>
      {EMPRESA_Q.map((q) => (
        <TextField key={q.id} label={q.label} value={empresa[q.id]} onChange={(v) => setEmpresa({ ...empresa, [q.id]: v })}
          audioUrl={audio[q.id]} recording={recordingId === q.id} onRecordToggle={() => toggleRecord(q.id)} />
      ))}
    </div>
  );
}
