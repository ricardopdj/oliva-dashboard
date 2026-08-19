import { TOKENS } from "../../styles/tokens";
import { useBriefing } from "../../state/useBriefing";
import { PlaylistCard } from "../PlaylistCard";
import olivaMark from "../../assets/oliva-mark.png";

export function WelcomeStep() {
  const { welcome, setWelcome, musicaSugestao, setMusicaSugestao, setActiveStep } = useBriefing();

  return (
    <div style={{ background: TOKENS.black, borderRadius: 16, padding: "40px 36px 36px", maxWidth: 680, position: "relative", overflow: "hidden" }}>
      <img src={olivaMark} alt="" style={{ position: "absolute", right: -20, bottom: -14, width: 560, opacity: 0.16, pointerEvents: "none" }} />
      <span style={{ color: TOKENS.mocha, fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 700 }}>trilha para a experiência</span>
      <h1 className="oliva-display" style={{ fontSize: 36, margin: "10px 0 16px", color: "#fff", lineHeight: 1.05 }}>
        aperte play<br />e se conecte
      </h1>
      <p style={{ color: "#D8D2C8", fontSize: 14, lineHeight: 1.7, maxWidth: 480, position: "relative" }}>
        Esse briefing não tem resposta certa nem errada. Escreva solto, conte causo.
        Deixa essa playlist tocando e responde no seu ritmo.
      </p>

      <PlaylistCard />

      <div style={{ marginTop: 18, position: "relative" }}>
        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TOKENS.mocha, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>
          Contribua com a nossa playlist
        </label>
        <p style={{ fontSize: 12.5, color: "#B9AF9F", marginBottom: 8 }}>
          Sugira o nome de uma música e artista que combinaria com essa playlist de onboarding.
        </p>
        <input className="oliva-input" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(199,172,153,0.35)", color: "#fff" }}
          value={musicaSugestao} onChange={(e) => setMusicaSugestao(e.target.value)} placeholder="Ex: Música — Artista" />
      </div>

      <button
        className="oliva-btn-primary"
        onClick={() => setActiveStep(1)}
        style={{ marginTop: 22, width: "100%", justifyContent: "center", background: "transparent", border: `1px solid ${TOKENS.mocha}`, color: TOKENS.mocha, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", padding: "13px 20px" }}
      >
        Começar a experiência
      </button>

      <div style={{ marginTop: 26, display: "flex", gap: 14, flexWrap: "wrap", position: "relative" }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TOKENS.mocha, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Nome da empresa</label>
          <input className="oliva-input" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(199,172,153,0.35)", color: "#fff" }}
            value={welcome.empresa || ""} onChange={(e) => setWelcome({ ...welcome, empresa: e.target.value })} placeholder="Ex: Nome da empresa" />
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TOKENS.mocha, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Seu nome</label>
          <input className="oliva-input" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(199,172,153,0.35)", color: "#fff" }}
            value={welcome.responsavel || ""} onChange={(e) => setWelcome({ ...welcome, responsavel: e.target.value })} placeholder="Nome de quem está respondendo" />
        </div>
      </div>
      {welcome.responsavel && (
        <p style={{ marginTop: 18, fontSize: 14, color: TOKENS.mocha, fontWeight: 600, position: "relative" }}>
          Olá, {welcome.responsavel}! Vamos estruturar o briefing {welcome.empresa ? `da ${welcome.empresa}` : "da sua empresa"} juntos.
        </p>
      )}
    </div>
  );
}
