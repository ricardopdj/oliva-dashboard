import { CheckCircle2, Circle } from "lucide-react";
import { cardStyle, TOKENS } from "../../styles/tokens";
import { CHECKLIST_DEFAULT } from "../../data/checklist";
import { useBriefing } from "../../state/useBriefing";

export function ChecklistStep() {
  const { checklistDone, setChecklistDone } = useBriefing();

  return (
    <div className="oliva-card" style={cardStyle}>
      <span className="oliva-badge">08</span>
      <h2 className="oliva-display" style={{ fontSize: 26, color: TOKENS.black, margin: "0 0 4px" }}>checklist de onboarding</h2>
      <p style={{ fontSize: 13, color: TOKENS.inkSoft, marginBottom: 20 }}>
        Eu confirmo que enviei informações pertinentes para cada área abaixo:
      </p>
      {CHECKLIST_DEFAULT.map((text, i) => (
        <div key={i} onClick={() => { const arr = [...checklistDone]; arr[i] = !arr[i]; setChecklistDone(arr); }}
          style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 4px", cursor: "pointer", borderBottom: `1px solid ${TOKENS.hair}` }}>
          {checklistDone[i] ? <CheckCircle2 size={18} color={TOKENS.black} style={{ flexShrink: 0, marginTop: 1 }} /> : <Circle size={18} color={TOKENS.hair} style={{ flexShrink: 0, marginTop: 1 }} />}
          <span style={{ fontSize: 14, color: checklistDone[i] ? TOKENS.inkSoft : TOKENS.ink, textDecoration: checklistDone[i] ? "line-through" : "none", lineHeight: 1.5 }}>
            {text}
          </span>
        </div>
      ))}
    </div>
  );
}
