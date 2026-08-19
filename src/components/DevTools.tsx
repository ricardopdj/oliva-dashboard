import type { CSSProperties } from "react";
import { TOKENS } from "../styles/tokens";
import { useBriefing } from "../state/useBriefing";
import { TEST_DATA, TEST_NETWORKS } from "../dev/testData";

const devLinkStyle: CSSProperties = {
  display: "block", background: "none", border: "none", color: TOKENS.inkSoft, fontSize: 11.5,
  cursor: "pointer", padding: "6px 16px", textAlign: "left", textDecoration: "underline", width: "100%",
};

export function DevTools() {
  const b = useBriefing();

  if (!import.meta.env.DEV) return null;

  const fillTestData = () => {
    b.setWelcome(TEST_DATA.welcome);
    b.setCadastro(TEST_DATA.cadastro);
    b.setEmpresa(TEST_DATA.empresa);
    b.setPublico(TEST_DATA.publico);
    b.setDiferenciais(TEST_DATA.diferenciais);
    b.setReferencias(TEST_DATA.referencias);
    TEST_NETWORKS.forEach((net) => {
      if (!b.selectedNetworks.includes(net)) b.toggleNetwork(net);
    });
    Object.entries(TEST_DATA.networkData).forEach(([net, fields]) => {
      Object.entries(fields).forEach(([field, val]) => b.setNetField(net, field, val));
    });
    b.setOutrosContatos(TEST_DATA.outrosContatos);
    b.setMateriaisLinks(TEST_DATA.materiaisLinks);
    b.setPontoFocal(TEST_DATA.pontoFocal);
    b.setRespLegal(TEST_DATA.respLegal);
    b.setRespFinanceiro(TEST_DATA.respFinanceiro);
    b.setMusicaSugestao(TEST_DATA.musicaSugestao);
    b.setChecklistDone(TEST_DATA.checklistDone);
  };

  return (
    <div style={{ marginTop: 18, paddingTop: 14, borderTop: `1px dashed ${TOKENS.hair}` }}>
      <p style={{ fontSize: 10, color: TOKENS.inkSoft, textTransform: "uppercase", letterSpacing: 0.5, padding: "0 16px", marginBottom: 6 }}>
        Dev only
      </p>
      <button onClick={fillTestData} style={devLinkStyle}>
        Preencher com dados de teste
      </button>
      <button onClick={b.submitBriefing} disabled={b.submitStatus === "submitting"} style={devLinkStyle}>
        {b.submitStatus === "submitting" ? "Enviando..." : "Testar envio de e-mail"}
      </button>
      {b.submitStatus === "success" && (
        <p style={{ fontSize: 11, color: "#2E7D32", padding: "0 16px" }}>E-mail de teste enviado.</p>
      )}
      {b.submitStatus === "error" && b.submitError && (
        <p style={{ fontSize: 11, color: "#C25B4A", padding: "0 16px" }}>{b.submitError}</p>
      )}
    </div>
  );
}
