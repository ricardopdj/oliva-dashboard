import {
  AlertCircle, Building2, CheckCircle2, Circle, Copy, FileText, Link2, ListChecks, Mail, Play, Quote, Send, Sparkles, Upload, Users,
  type LucideIcon,
} from "lucide-react";
import { cardStyle, TOKENS } from "../../styles/tokens";
import { CHECKLIST_DEFAULT } from "../../data/checklist";
import { useBriefing } from "../../state/useBriefing";
import { EMPRESA_Q, PUBLICO_Q, DIFERENCIAIS_Q, REFERENCIAS_Q } from "../../data/questions";
import type { SectionId } from "../../data/sections";

interface SummaryCard {
  stepId: SectionId;
  icon: LucideIcon;
  title: string;
  filled: boolean;
  preview: string;
}

export function ResumoStep() {
  const {
    progress, welcome, cadastro, respLegal, respFinanceiro, empresa, publico, diferenciais, referencias,
    selectedNetworks, materiaisLinks, checklistDone, musicaSugestao, stepIndex, setActiveStep,
    copySummary, sendWhatsapp, audioBlobs, submitStatus, submitError, submitBriefing,
  } = useBriefing();

  const audioTotalMb = Object.values(audioBlobs).reduce((sum, b) => sum + b.size, 0) / (1024 * 1024);

  const cards: SummaryCard[] = [
    {
      stepId: "cadastro", icon: FileText, title: "Dados cadastrais",
      filled: !!(cadastro.razaoSocial || cadastro.nomeFantasia || Object.values(respLegal).some(Boolean) || Object.values(respFinanceiro).some(Boolean)),
      preview: cadastro.razaoSocial || cadastro.nomeFantasia || "Empresa, responsáveis e contatos",
    },
    {
      stepId: "empresa", icon: Building2, title: "Sobre a empresa",
      filled: EMPRESA_Q.some((q) => empresa[q.id]),
      preview: empresa.e1 || "O que a empresa faz",
    },
    {
      stepId: "publico", icon: Users, title: "Sobre o público",
      filled: PUBLICO_Q.some((q) => publico[q.id]),
      preview: publico.p1 || "Quem compra ou contrata",
    },
    {
      stepId: "diferenciais", icon: Sparkles, title: "Diferenciais",
      filled: DIFERENCIAIS_Q.some((q) => diferenciais[q.id]),
      preview: diferenciais.d1 || "O que só essa empresa tem",
    },
    {
      stepId: "referencias", icon: Quote, title: "Referências",
      filled: REFERENCIAS_Q.some((q) => referencias[q.id]),
      preview: referencias.r1 ? "Referências preenchidas" : "Perfis de inspiração",
    },
    {
      stepId: "redes", icon: Link2, title: "Redes sociais",
      filled: selectedNetworks.length > 0,
      preview: selectedNetworks.length ? selectedNetworks.join(", ") : "Nenhuma selecionada",
    },
    {
      stepId: "materiais", icon: Upload, title: "Materiais e links",
      filled: materiaisLinks.some((m) => m.nome || m.link),
      preview: materiaisLinks.filter((m) => m.nome || m.link).length
        ? `${materiaisLinks.filter((m) => m.nome || m.link).length} item(ns) enviados`
        : "Nenhum material ainda",
    },
    {
      stepId: "checklist", icon: ListChecks, title: "Checklist onboarding",
      filled: checklistDone.some(Boolean),
      preview: `${checklistDone.filter(Boolean).length}/${CHECKLIST_DEFAULT.length} confirmados`,
    },
  ];

  return (
    <div style={cardStyle}>
      <span className="oliva-badge">09</span>
      <h2 className="oliva-display" style={{ fontSize: 26, color: TOKENS.black, margin: "0 0 4px" }}>resumo final</h2>
      <p style={{ fontSize: 13, color: TOKENS.inkSoft, marginBottom: 22 }}>
        Revise por aqui. Clique em qualquer bloco para voltar e completar.
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, background: TOKENS.mochaSoft, borderRadius: 14, padding: "16px 18px" }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%", flexShrink: 0,
          background: `conic-gradient(${TOKENS.mochaDeep} ${progress * 3.6}deg, #fff ${progress * 3.6}deg)`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: TOKENS.mochaSoft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: TOKENS.black }}>
            {progress}%
          </div>
        </div>
        <div>
          <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: TOKENS.black }}>
            {welcome.empresa || "Sua empresa"}
          </p>
          <p style={{ margin: "2px 0 0", fontSize: 12.5, color: TOKENS.inkSoft }}>
            Preenchido por {welcome.responsavel || "-"}
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 10, marginBottom: 22 }}>
        {cards.map((card) => (
          <div key={card.stepId} onClick={() => setActiveStep(stepIndex(card.stepId))}
            style={{
              border: `1px solid ${TOKENS.hair}`, borderRadius: 12, padding: "14px 14px", cursor: "pointer",
              background: "#fff", transition: "border-color .15s",
            }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <card.icon size={15} color={TOKENS.mochaDeep} />
                <span style={{ fontSize: 13, fontWeight: 600, color: TOKENS.black }}>{card.title}</span>
              </div>
              {card.filled ? <CheckCircle2 size={15} color={TOKENS.mochaDeep} /> : <Circle size={15} color={TOKENS.hair} />}
            </div>
            <p style={{ margin: 0, fontSize: 12, color: TOKENS.inkSoft, lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
              {card.preview}
            </p>
          </div>
        ))}
      </div>

      {musicaSugestao && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: TOKENS.black, borderRadius: 12, padding: "12px 16px", marginBottom: 22 }}>
          <Play size={14} color={TOKENS.mocha} fill={TOKENS.mocha} />
          <span style={{ fontSize: 12.5, color: "#fff" }}>Sugestão pra playlist: <strong style={{ color: TOKENS.mocha }}>{musicaSugestao}</strong></span>
        </div>
      )}

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <button className="oliva-btn-primary" onClick={submitBriefing} disabled={submitStatus === "submitting"}
          style={{ opacity: submitStatus === "submitting" ? 0.6 : 1 }}>
          <Mail size={14} /> {submitStatus === "submitting" ? "Enviando..." : "Enviar briefing"}
        </button>
        <button className="oliva-btn-secondary" onClick={copySummary}><Copy size={14} /> Copiar resumo</button>
        <button className="oliva-btn-secondary" onClick={sendWhatsapp}><Send size={14} /> Enviar por WhatsApp</button>
        {audioTotalMb > 0.05 && (
          <span style={{ fontSize: 11.5, color: TOKENS.inkSoft }}>
            Áudios: {audioTotalMb.toFixed(1)}MB
          </span>
        )}
      </div>

      {submitStatus === "success" && (
        <p style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 12, fontSize: 13, color: "#2E7D32" }}>
          <CheckCircle2 size={15} /> Briefing enviado com sucesso.
        </p>
      )}
      {submitStatus === "error" && submitError && (
        <p style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 12, fontSize: 13, color: "#C25B4A" }}>
          <AlertCircle size={15} /> {submitError}
        </p>
      )}
    </div>
  );
}
