import { Menu, X } from "lucide-react";
import { TOKENS } from "../styles/tokens";
import { useBriefing } from "../state/useBriefing";
import olivaLogo from "../assets/oliva-logo.png";

export function TopBar() {
  const { progress, mobileNavOpen, setMobileNavOpen } = useBriefing();

  return (
    <div className="oliva-topbar" style={{ padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, background: TOKENS.black, position: "relative", overflow: "hidden" }}>
      <img src={olivaLogo} alt="" style={{ position: "absolute", right: -10, top: -20, width: 260, opacity: 0.16, pointerEvents: "none" }} />
      <div className="oliva-topbar-brand" style={{ display: "flex", alignItems: "center", gap: 10, position: "relative", flex: "1 1 auto" }}>
        <img src={olivaLogo} alt="Oliva Marketing" style={{ height: 42, width: "auto", flexShrink: 0 }} />
        <span className="oliva-topbar-subtitle" style={{ color: TOKENS.mocha, fontSize: 11, letterSpacing: 1, textTransform: "uppercase", fontWeight: 600 }}>Briefing para Setup + Direção Redes Sociais</span>
      </div>
      <div className="oliva-mobile-bar" style={{ display: "none", flexShrink: 0 }}>
        <button onClick={() => setMobileNavOpen((v) => !v)} aria-label={mobileNavOpen ? "Fechar menu" : "Abrir menu"} style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer" }}>
          {mobileNavOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, position: "relative", flexShrink: 0 }}>
        <div className="oliva-progress-track">
          <div style={{ width: `${progress}%`, height: "100%", background: TOKENS.mocha, transition: "width .3s" }} />
        </div>
        <span style={{ color: TOKENS.mocha, fontSize: 12, minWidth: 34, fontWeight: 600 }}>{progress}%</span>
      </div>
    </div>
  );
}
