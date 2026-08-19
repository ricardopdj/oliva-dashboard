import { HelpCircle } from "lucide-react";
import { cardStyle, TOKENS } from "../../styles/tokens";
import { NETWORK_Q, NETWORK_Q_NO_ACESSO } from "../../data/questions";
import { LINKEDIN_STEPS, NETWORK_OPTIONS } from "../../data/networks";
import { useBriefing } from "../../state/useBriefing";
import { TextField } from "../TextField";

export function RedesStep() {
  const {
    selectedNetworks, toggleNetwork, networkData, setNetField,
    showLinkedinHelp, setShowLinkedinHelp, audio, recordingId, toggleRecord,
  } = useBriefing();

  return (
    <div style={cardStyle}>
      <span className="oliva-badge">06</span>
      <h2 className="oliva-display" style={{ fontSize: 26, color: TOKENS.black, margin: "0 0 4px" }}>redes sociais</h2>
      <p style={{ fontSize: 13, color: TOKENS.inkSoft, marginBottom: 4 }}>
        Selecione todas as redes que fazem parte do trabalho. Vocês podem ter quantas quiserem, com o devido acréscimo no investimento.
      </p>
      <p style={{ fontSize: 13, color: TOKENS.inkSoft, marginBottom: 4 }}>
        Depois de selecionar, complete as informações de cada rede abaixo.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "16px 0 24px" }}>
        {NETWORK_OPTIONS.map((net) => {
          const active = selectedNetworks.includes(net);
          return (
            <button key={net} onClick={() => toggleNetwork(net)} style={{
              padding: "7px 14px", borderRadius: 999, fontSize: 13, cursor: "pointer",
              border: `1px solid ${active ? TOKENS.black : TOKENS.hair}`,
              background: active ? TOKENS.black : "#fff", color: active ? "#fff" : TOKENS.ink,
            }}>
              {net}
            </button>
          );
        })}
      </div>
      {selectedNetworks.length === 0 && (
        <p style={{ fontSize: 13, color: TOKENS.inkSoft }}>Selecione ao menos uma rede acima para ver as perguntas.</p>
      )}
      {selectedNetworks.map((net) => (
        <div key={net} style={{ borderTop: `1px solid ${TOKENS.hair}`, paddingTop: 18, marginTop: 8 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: TOKENS.mochaDeep, marginBottom: 12 }}>{net}</h3>
          {net === "Outra" && (
            <TextField label="Qual é o nome dessa rede?" rows={1} value={networkData[net]?.nomeRede as string | undefined}
              onChange={(v) => setNetField(net, "nomeRede", v)} />
          )}
          {net === "LinkedIn" && (
            <div style={{ background: TOKENS.mochaSoft, borderRadius: 10, padding: "12px 14px", marginBottom: 16, fontSize: 12.5, color: TOKENS.ink }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                <span style={{ flex: 1 }}>
                  Para termos acesso: adicione o perfil (não pode ser página) <strong>Erika Rosa</strong> (
                  <a href="https://www.linkedin.com/in/erikarosa/" target="_blank" rel="noreferrer" style={{ color: TOKENS.mochaDeep }}>linkedin.com/in/erikarosa</a>
                  ) como Superadministrador da página do LinkedIn.
                </span>
                <button onClick={() => setShowLinkedinHelp((s) => !s)} aria-label="Passos para adicionar um Superadministrador"
                  style={{ background: "none", border: "none", cursor: "pointer", color: TOKENS.mochaDeep, display: "flex", flexShrink: 0 }}>
                  <HelpCircle size={16} />
                </button>
              </div>
              {showLinkedinHelp && (
                <ol style={{ margin: "10px 0 0", paddingLeft: 18 }}>
                  {LINKEDIN_STEPS.map((step, i) => (
                    <li key={i} style={{ marginBottom: 4 }}>{step}</li>
                  ))}
                </ol>
              )}
              <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, fontSize: 12.5, cursor: "pointer" }}>
                <input type="checkbox" checked={!!networkData[net]?.confirmouAcesso}
                  onChange={(e) => setNetField(net, "confirmouAcesso", e.target.checked)} />
                Já adicionei o perfil como Superadministrador
              </label>
            </div>
          )}
          {(net === "LinkedIn" ? NETWORK_Q_NO_ACESSO : NETWORK_Q).map((q) => (
            <TextField key={q.id} label={q.label} rows={2} value={networkData[net]?.[q.id] as string | undefined}
              onChange={(v) => setNetField(net, q.id, v)}
              audioUrl={q.id !== "acesso" ? audio[`${net}-${q.id}`] : undefined}
              recording={q.id !== "acesso" ? recordingId === `${net}-${q.id}` : undefined}
              onRecordToggle={q.id !== "acesso" ? () => toggleRecord(`${net}-${q.id}`) : undefined} />
          ))}
        </div>
      ))}
    </div>
  );
}
