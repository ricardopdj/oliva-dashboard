import { Trash2 } from "lucide-react";
import { cardStyle, TOKENS } from "../../styles/tokens";
import { useBriefing } from "../../state/useBriefing";

export function MateriaisStep() {
  const { materiaisLinks, setMateriaisLinks } = useBriefing();

  return (
    <div className="oliva-card" style={cardStyle}>
      <span className="oliva-badge">07</span>
      <h2 className="oliva-display" style={{ fontSize: 26, color: TOKENS.black, margin: "0 0 12px" }}>materiais e links</h2>
      <p style={{ fontSize: 13.5, color: TOKENS.inkSoft, marginBottom: 6, lineHeight: 1.6 }}>
        Aqui é a área para adicionar o seu Logo e Identidade Visual, fotos e vídeos já disponíveis, materiais antigos, links do Canva ou do Adobe... o que já existir.
      </p>
      <p style={{ fontSize: 13.5, color: TOKENS.inkSoft, marginBottom: 22, lineHeight: 1.6 }}>
        Para cada pasta ou material, dê um nome pelo qual vamos nos referir a ele nas reuniões e descreva rapidamente o que tem dentro.
        Exemplo: <em>"Identidade Visual"</em> — aqui você encontra todo o material de identidade visual da empresa. Ou <em>"Arquivos Canva"</em> — aqui estão nossos arquivos antigos do Canva, da nossa última sessão fotográfica.
      </p>

      {materiaisLinks.map((m, i) => (
        <div key={i} style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap", alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 160px", minWidth: 160 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 500, marginBottom: 4, color: TOKENS.inkSoft }}>Nome / Título</label>
            <input className="oliva-input" placeholder="ex: Identidade Visual" value={m.nome}
              onChange={(e) => { const arr = [...materiaisLinks]; arr[i] = { ...arr[i], nome: e.target.value }; setMateriaisLinks(arr); }} />
          </div>
          <div style={{ flex: "2 1 240px", minWidth: 220 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 500, marginBottom: 4, color: TOKENS.inkSoft }}>Descrição do conteúdo</label>
            <textarea className="oliva-input" rows={2} placeholder="O que tem dentro dessa pasta ou material"
              style={{ resize: "vertical", fontFamily: "inherit" }} value={m.conteudo}
              onChange={(e) => { const arr = [...materiaisLinks]; arr[i] = { ...arr[i], conteudo: e.target.value }; setMateriaisLinks(arr); }} />
          </div>
          <div style={{ flex: "1 1 200px", minWidth: 200 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 500, marginBottom: 4, color: TOKENS.inkSoft }}>Link</label>
            <div style={{ display: "flex", gap: 6 }}>
              <input className="oliva-input" placeholder="https://" value={m.link}
                onChange={(e) => { const arr = [...materiaisLinks]; arr[i] = { ...arr[i], link: e.target.value }; setMateriaisLinks(arr); }} />
              <button onClick={() => setMateriaisLinks(materiaisLinks.filter((_, idx) => idx !== i))}
                style={{ background: "none", border: "none", cursor: "pointer", color: TOKENS.inkSoft, flexShrink: 0 }}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
      <button className="oliva-btn-secondary" onClick={() => setMateriaisLinks([...materiaisLinks, { nome: "", conteudo: "", link: "" }])} style={{ marginTop: 4 }}>
        + Adicionar item
      </button>
    </div>
  );
}
