import { Trash2 } from "lucide-react";
import { cardStyle, TOKENS } from "../../styles/tokens";
import { CONTATO_CAMPOS, MAX_OUTROS_CONTATOS, RESP_FIELDS } from "../../data/fields";
import { useBriefing } from "../../state/useBriefing";

export function CadastroStep() {
  const {
    cadastro, setCadastro, respLegal, setRespLegal, respFinanceiro, setRespFinanceiro,
    pontoFocal, setPontoFocal, outrosContatos, setOutrosContatos,
  } = useBriefing();

  return (
    <div style={cardStyle}>
      <span className="oliva-badge">01</span>
      <h2 className="oliva-display" style={{ fontSize: 26, color: TOKENS.black, margin: "0 0 4px" }}>dados cadastrais</h2>
      <p style={{ fontSize: 13, color: TOKENS.inkSoft, marginBottom: 18 }}>Dados administrativos, para contrato e nota fiscal.</p>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
        <div style={{ flex: "1 1 220px", minWidth: 200 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Razão social</label>
          <input className="oliva-input" value={cadastro.razaoSocial || ""} onChange={(e) => setCadastro({ ...cadastro, razaoSocial: e.target.value })} />
        </div>
        <div style={{ flex: "1 1 220px", minWidth: 200 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Nome fantasia</label>
          <input className="oliva-input" value={cadastro.nomeFantasia || ""} onChange={(e) => setCadastro({ ...cadastro, nomeFantasia: e.target.value })} />
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
        <div style={{ flex: "1 1 150px", minWidth: 140 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6 }}>CNPJ</label>
          <input className="oliva-input" value={cadastro.cnpj || ""} onChange={(e) => setCadastro({ ...cadastro, cnpj: e.target.value })} />
        </div>
        <div style={{ flex: "1 1 150px", minWidth: 140 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Inscrição estadual (se houver)</label>
          <input className="oliva-input" value={cadastro.inscricaoEstadual || ""} onChange={(e) => setCadastro({ ...cadastro, inscricaoEstadual: e.target.value })} />
        </div>
        <div style={{ flex: "1 1 150px", minWidth: 140 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Inscrição municipal (se houver)</label>
          <input className="oliva-input" value={cadastro.inscricaoMunicipal || ""} onChange={(e) => setCadastro({ ...cadastro, inscricaoMunicipal: e.target.value })} />
        </div>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Endereço completo (contrato e nota fiscal)</label>
        <input className="oliva-input" value={cadastro.endereco || ""} onChange={(e) => setCadastro({ ...cadastro, endereco: e.target.value })} />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6 }}>E-mail para envio de contrato e notas fiscais</label>
        <input className="oliva-input" value={cadastro.emailFaturamento || ""} onChange={(e) => setCadastro({ ...cadastro, emailFaturamento: e.target.value })} />
      </div>

      <div style={{ borderTop: `1px solid ${TOKENS.hair}`, marginTop: 22, paddingTop: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: TOKENS.mochaDeep, marginBottom: 12 }}>Responsável legal</h3>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {RESP_FIELDS.map((c) => (
            <input key={c.id} className="oliva-input" style={{ minWidth: 140, flex: "1 1 140px" }} placeholder={c.label}
              value={respLegal[c.id] || ""} onChange={(e) => setRespLegal({ ...respLegal, [c.id]: e.target.value })} />
          ))}
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${TOKENS.hair}`, marginTop: 22, paddingTop: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: TOKENS.mochaDeep, marginBottom: 12 }}>Responsável financeiro</h3>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {RESP_FIELDS.map((c) => (
            <input key={c.id} className="oliva-input" style={{ minWidth: 140, flex: "1 1 140px" }} placeholder={c.label}
              value={respFinanceiro[c.id] || ""} onChange={(e) => setRespFinanceiro({ ...respFinanceiro, [c.id]: e.target.value })} />
          ))}
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${TOKENS.hair}`, marginTop: 22, paddingTop: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: TOKENS.mochaDeep, marginBottom: 2 }}>Contatos importantes</h3>
        <p style={{ fontSize: 12.5, color: TOKENS.inkSoft, marginBottom: 16 }}>
          Para o grupo de WhatsApp e o ClickUp. Assim não precisamos repetir o contato central toda vez.
        </p>
        <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Ponto focal</label>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
          {CONTATO_CAMPOS.map((c) => (
            <input key={c.id} className="oliva-input" style={{ minWidth: 140, flex: "1 1 140px" }} placeholder={c.label}
              value={pontoFocal[c.id] || ""} onChange={(e) => setPontoFocal({ ...pontoFocal, [c.id]: e.target.value })} />
          ))}
        </div>

        <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Outros contatos (até {MAX_OUTROS_CONTATOS})</label>
        {outrosContatos.map((c, i) => (
          <div key={i} style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
            {CONTATO_CAMPOS.map((campo) => (
              <input key={campo.id} className="oliva-input" style={{ minWidth: 140, flex: "1 1 140px" }} placeholder={campo.label}
                value={c[campo.id] || ""}
                onChange={(e) => {
                  const arr = [...outrosContatos];
                  arr[i] = { ...arr[i], [campo.id]: e.target.value };
                  setOutrosContatos(arr);
                }} />
            ))}
            <button onClick={() => setOutrosContatos(outrosContatos.filter((_, idx) => idx !== i))}
              style={{ background: "none", border: "none", cursor: "pointer", color: TOKENS.inkSoft }}>
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {outrosContatos.length < MAX_OUTROS_CONTATOS && (
          <button className="oliva-btn-secondary" onClick={() => setOutrosContatos([...outrosContatos, {}])} style={{ marginTop: 4 }}>
            + Adicionar contato
          </button>
        )}
      </div>
    </div>
  );
}
