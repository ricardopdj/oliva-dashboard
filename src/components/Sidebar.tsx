import { TOKENS } from "../styles/tokens";
import { SECTIONS } from "../data/sections";
import { useBriefing } from "../state/useBriefing";
import { DevTools } from "./DevTools";

export function Sidebar() {
  const { activeStep, setActiveStep, setMobileNavOpen, resetForm } = useBriefing();

  return (
    <div className="oliva-sidebar" style={{ width: 220, padding: "24px 14px", flexShrink: 0 }}>
      {SECTIONS.map((s, i) => {
        const Icon = s.icon;
        const active = i === activeStep;
        return (
          <div
            key={s.id}
            className="oliva-pill"
            onClick={() => { setActiveStep(i); setMobileNavOpen(false); }}
            style={{
              background: active ? TOKENS.mocha : "#fff",
              color: TOKENS.black,
              borderColor: active ? TOKENS.black : TOKENS.hair,
            }}
          >
            <Icon size={15} />
            {s.label}
          </div>
        );
      })}
      <button onClick={resetForm} style={{
        background: "none", border: "none", color: TOKENS.inkSoft, fontSize: 11.5, cursor: "pointer",
        padding: "10px 16px", marginTop: 10, textAlign: "left", textDecoration: "underline",
      }}>
        Reiniciar formulário
      </button>
      <DevTools />
    </div>
  );
}
