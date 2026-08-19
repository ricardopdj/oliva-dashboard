import { Menu, X } from "lucide-react";
import { TOKENS } from "../styles/tokens";
import { useBriefing } from "../state/useBriefing";
import olivaLogo from "../assets/oliva-logo.png";

export function TopBar() {
  const { progress, mobileNavOpen, setMobileNavOpen } = useBriefing();

  return (
    <div style={{ padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", background: TOKENS.black, position: "relative", overflow: "hidden" }}>
      <img src={olivaLogo} alt="" style={{ position: "absolute", right: -10, top: -20, width: 260, opacity: 0.16, pointerEvents: "none" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 10, position: "relative" }}>
        <img src={olivaLogo} alt="Oliva Marketing" style={{ height: 42, width: "auto" }} />
        <span style={{ color: TOKENS.mocha, fontSize: 11, letterSpacing: 1, textTransform: "uppercase", fontWeight: 600 }}>Briefing para Setup + Direção Redes Sociais</span>
      </div>
      <div className="oliva-mobile-bar" style={{ display: "none" }}>
        <button onClick={() => setMobileNavOpen((v) => !v)} style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer" }}>
          {mobileNavOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, position: "relative" }}>
        <div style={{ width: 120, height: 5, borderRadius: 999, background: "rgba(255,255,255,0.16)", overflow: "hidden" }}>
          <div style={{ width: `${progress}%`, height: "100%", background: TOKENS.mocha, transition: "width .3s" }} />
        </div>
        <span style={{ color: TOKENS.mocha, fontSize: 12, minWidth: 34, fontWeight: 600 }}>{progress}%</span>
      </div>
    </div>
  );
}
