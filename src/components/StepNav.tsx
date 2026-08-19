import { ChevronLeft, ChevronRight } from "lucide-react";
import { SECTIONS } from "../data/sections";
import { useBriefing } from "../state/useBriefing";

export function StepNav() {
  const { activeStep, setActiveStep } = useBriefing();

  return (
    <div style={{ display: "flex", justifyContent: "space-between", maxWidth: 680, marginTop: 18 }}>
      <button className="oliva-btn-secondary" disabled={activeStep === 0}
        onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
        style={{ opacity: activeStep === 0 ? 0.4 : 1 }}>
        <ChevronLeft size={14} /> Anterior
      </button>
      <button className="oliva-btn-primary" disabled={activeStep === SECTIONS.length - 1}
        onClick={() => setActiveStep((s) => Math.min(SECTIONS.length - 1, s + 1))}
        style={{ opacity: activeStep === SECTIONS.length - 1 ? 0.4 : 1 }}>
        Próximo <ChevronRight size={14} />
      </button>
    </div>
  );
}
