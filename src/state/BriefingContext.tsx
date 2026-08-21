import {
  useCallback, useEffect, useMemo, useState,
  type ReactNode,
} from "react";
import { uploadPresigned } from "@vercel/blob/client";
import { SECTIONS, type SectionId } from "../data/sections";
import { EMPRESA_Q, PUBLICO_Q, DIFERENCIAIS_Q, REFERENCIAS_Q, NETWORK_Q, NETWORK_Q_NO_ACESSO } from "../data/questions";
import { CADASTRO_FIELDS, RESP_FIELDS, CONTATO_CAMPOS } from "../data/fields";
import { CHECKLIST_DEFAULT } from "../data/checklist";
import { useAudioRecorder } from "../hooks/useAudioRecorder";
import { useSpeechToText } from "../hooks/useSpeechToText";
import { SPEECH_RECOGNITION_SUPPORTED } from "../lib/speechRecognition";
import { useDebouncedSave } from "../hooks/useDebouncedSave";
import { clearAll, loadDraft, saveDraft } from "../lib/db";
import type {
  BriefingFormState, ContatoData, FieldValues, MaterialLink, NetworkData, WelcomeData,
} from "./types";
import { BriefingContext, type BriefingContextValue } from "./context";

const initialState: BriefingFormState = {
  welcome: {},
  cadastro: {},
  empresa: {},
  publico: {},
  diferenciais: {},
  referencias: {},
  selectedNetworks: [],
  networkData: {},
  showLinkedinHelp: false,
  outrosContatos: [],
  materiaisLinks: [{ nome: "", conteudo: "", link: "" }],
  pontoFocal: {},
  respLegal: {},
  respFinanceiro: {},
  musicaSugestao: "",
  checklistDone: CHECKLIST_DEFAULT.map(() => false),
};

export function BriefingProvider({ children }: { children: ReactNode }) {
  const [activeStep, setActiveStep] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const [welcome, setWelcome] = useState<WelcomeData>(initialState.welcome);
  const [cadastro, setCadastro] = useState<FieldValues>(initialState.cadastro);
  const [empresa, setEmpresa] = useState<FieldValues>(initialState.empresa);
  const [publico, setPublico] = useState<FieldValues>(initialState.publico);
  const [diferenciais, setDiferenciais] = useState<FieldValues>(initialState.diferenciais);
  const [referencias, setReferencias] = useState<FieldValues>(initialState.referencias);
  const [selectedNetworks, setSelectedNetworks] = useState<string[]>(initialState.selectedNetworks);
  const [networkData, setNetworkData] = useState<NetworkData>(initialState.networkData);
  const [showLinkedinHelp, setShowLinkedinHelp] = useState(initialState.showLinkedinHelp);
  const [outrosContatos, setOutrosContatos] = useState<ContatoData[]>(initialState.outrosContatos);
  const [materiaisLinks, setMateriaisLinks] = useState<MaterialLink[]>(initialState.materiaisLinks);
  const [pontoFocal, setPontoFocal] = useState<FieldValues>(initialState.pontoFocal);
  const [respLegal, setRespLegal] = useState<FieldValues>(initialState.respLegal);
  const [respFinanceiro, setRespFinanceiro] = useState<FieldValues>(initialState.respFinanceiro);
  const [musicaSugestao, setMusicaSugestao] = useState(initialState.musicaSugestao);
  const [checklistDone, setChecklistDone] = useState<boolean[]>(initialState.checklistDone);

  const audioRecorder = useAudioRecorder();
  const speechToText = useSpeechToText();
  const toggleAudioRecord = audioRecorder.toggleRecord;
  const toggleSpeechRecord = speechToText.toggleRecord;
  const { audio, audioBlobs, recordingId, resetAudio } =
    SPEECH_RECOGNITION_SUPPORTED ? speechToText : audioRecorder;

  const toggleRecord = useCallback(
    (qid: string, currentValue: string = "", onTranscriptChange: (text: string) => void = () => {}) => {
      if (SPEECH_RECOGNITION_SUPPORTED) {
        toggleSpeechRecord(qid, currentValue, onTranscriptChange);
      } else {
        toggleAudioRecord(qid);
      }
    },
    [toggleSpeechRecord, toggleAudioRecord],
  );

  const [loaded, setLoaded] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const draft = await loadDraft();
      if (draft) {
        setWelcome(draft.welcome);
        setCadastro(draft.cadastro);
        setEmpresa(draft.empresa);
        setPublico(draft.publico);
        setDiferenciais(draft.diferenciais);
        setReferencias(draft.referencias);
        setSelectedNetworks(draft.selectedNetworks);
        setNetworkData(draft.networkData);
        setShowLinkedinHelp(draft.showLinkedinHelp);
        setOutrosContatos(draft.outrosContatos);
        setMateriaisLinks(draft.materiaisLinks);
        setPontoFocal(draft.pontoFocal);
        setRespLegal(draft.respLegal);
        setRespFinanceiro(draft.respFinanceiro);
        setMusicaSugestao(draft.musicaSugestao);
        setChecklistDone(draft.checklistDone);
      }
      setLoaded(true);
    })();
  }, []);

  const { trigger: triggerSaveDraft, status: draftStatus } = useDebouncedSave<BriefingFormState>(saveDraft);

  useEffect(() => {
    if (!loaded) return;
    triggerSaveDraft({
      welcome, cadastro, empresa, publico, diferenciais, referencias, selectedNetworks, networkData,
      showLinkedinHelp, outrosContatos, materiaisLinks, pontoFocal, respLegal, respFinanceiro,
      musicaSugestao, checklistDone,
    });
  }, [
    loaded, welcome, cadastro, empresa, publico, diferenciais, referencias, selectedNetworks, networkData,
    showLinkedinHelp, outrosContatos, materiaisLinks, pontoFocal, respLegal, respFinanceiro,
    musicaSugestao, checklistDone, triggerSaveDraft,
  ]);

  const toggleNetwork = useCallback((net: string) => {
    setSelectedNetworks((prev) => (prev.includes(net) ? prev.filter((n) => n !== net) : [...prev, net]));
  }, []);

  const setNetField = useCallback((net: string, field: string, val: string | boolean) => {
    setNetworkData((prev) => ({ ...prev, [net]: { ...(prev[net] || {}), [field]: val } }));
  }, []);

  const resetForm = useCallback(() => {
    if (!window.confirm("Isso apaga todas as respostas preenchidas nesta sessão. Continuar?")) return;
    setWelcome(initialState.welcome);
    setCadastro(initialState.cadastro);
    setEmpresa(initialState.empresa);
    setPublico(initialState.publico);
    setDiferenciais(initialState.diferenciais);
    setReferencias(initialState.referencias);
    setSelectedNetworks(initialState.selectedNetworks);
    setNetworkData(initialState.networkData);
    setOutrosContatos(initialState.outrosContatos);
    setMateriaisLinks(initialState.materiaisLinks);
    setPontoFocal(initialState.pontoFocal);
    setRespLegal(initialState.respLegal);
    setRespFinanceiro(initialState.respFinanceiro);
    setMusicaSugestao(initialState.musicaSugestao);
    setChecklistDone(CHECKLIST_DEFAULT.map(() => false));
    resetAudio();
    setActiveStep(0);
    setSubmitStatus("idle");
    setSubmitError(null);
    clearAll();
  }, [resetAudio]);

  const totalFields =
    CADASTRO_FIELDS.length + RESP_FIELDS.length * 2 + EMPRESA_Q.length + PUBLICO_Q.length + DIFERENCIAIS_Q.length + REFERENCIAS_Q.length +
    selectedNetworks.length * NETWORK_Q.length;
  const filledFields =
    CADASTRO_FIELDS.filter((f) => cadastro[f.id]).length +
    RESP_FIELDS.filter((f) => respLegal[f.id]).length +
    RESP_FIELDS.filter((f) => respFinanceiro[f.id]).length +
    EMPRESA_Q.filter((f) => empresa[f.id]).length +
    PUBLICO_Q.filter((f) => publico[f.id]).length +
    DIFERENCIAIS_Q.filter((f) => diferenciais[f.id]).length +
    REFERENCIAS_Q.filter((f) => referencias[f.id]).length +
    selectedNetworks.reduce((acc, net) => acc + (net === "LinkedIn" ? NETWORK_Q_NO_ACESSO : NETWORK_Q).filter((q) => networkData[net]?.[q.id]).length, 0);
  const progress = totalFields ? Math.round((filledFields / totalFields) * 100) : 0;

  const buildSummary = useCallback(() => {
    const lines: string[] = [];
    lines.push(`BRIEFING PARA SETUP + DIREÇÃO REDES SOCIAIS`);
    lines.push(`Empresa: ${welcome.empresa || "-"}   Responsável: ${welcome.responsavel || "-"}`);
    lines.push("");
    lines.push("== DADOS CADASTRAIS ==");
    CADASTRO_FIELDS.forEach((f) => { if (cadastro[f.id]) lines.push(`${f.label}: ${cadastro[f.id]}`); });
    lines.push("");
    lines.push("== RESPONSÁVEL LEGAL ==");
    RESP_FIELDS.forEach((f) => { if (respLegal[f.id]) lines.push(`${f.label}: ${respLegal[f.id]}`); });
    lines.push("");
    lines.push("== RESPONSÁVEL FINANCEIRO ==");
    RESP_FIELDS.forEach((f) => { if (respFinanceiro[f.id]) lines.push(`${f.label}: ${respFinanceiro[f.id]}`); });
    lines.push("");
    lines.push("== CONTATOS IMPORTANTES ==");
    if (Object.values(pontoFocal).some(Boolean)) {
      lines.push(`Ponto focal: ${CONTATO_CAMPOS.map((c) => `${c.label}: ${pontoFocal[c.id] || "-"}`).join(" | ")}`);
    }
    outrosContatos.forEach((c, i) => {
      if (Object.values(c).some(Boolean)) {
        lines.push(`Outro contato ${i + 1}: ${CONTATO_CAMPOS.map((campo) => `${campo.label}: ${c[campo.id] || "-"}`).join(" | ")}`);
      }
    });
    lines.push("");
    lines.push("== SOBRE A EMPRESA ==");
    EMPRESA_Q.forEach((f) => { if (empresa[f.id]) lines.push(`${f.label}\n${empresa[f.id]}`); });
    lines.push("");
    lines.push("== SOBRE O PÚBLICO ==");
    PUBLICO_Q.forEach((f) => { if (publico[f.id]) lines.push(`${f.label}\n${publico[f.id]}`); });
    lines.push("");
    lines.push("== DIFERENCIAIS ==");
    DIFERENCIAIS_Q.forEach((f) => { if (diferenciais[f.id]) lines.push(`${f.label}\n${diferenciais[f.id]}`); });
    lines.push("");
    lines.push("== REFERÊNCIAS ==");
    REFERENCIAS_Q.forEach((f) => { if (referencias[f.id]) lines.push(`${f.label}\n${referencias[f.id]}`); });
    lines.push("");
    lines.push("== REDES SOCIAIS ==");
    selectedNetworks.forEach((net) => {
      lines.push(`-- ${net} --`);
      (net === "LinkedIn" ? NETWORK_Q_NO_ACESSO : NETWORK_Q).forEach((q) => { if (networkData[net]?.[q.id]) lines.push(`${q.label}: ${networkData[net][q.id]}`); });
    });
    lines.push("");
    lines.push("== O QUE ENCONTRAREMOS (MATERIAIS) ==");
    materiaisLinks.forEach((m) => { if (m.nome || m.conteudo || m.link) lines.push(`${m.nome} — ${m.conteudo} — ${m.link}`); });
    if (musicaSugestao) {
      lines.push("");
      lines.push("== SUGESTÃO PARA A PLAYLIST ==");
      lines.push(musicaSugestao);
    }
    return lines.join("\n");
  }, [welcome, cadastro, respLegal, respFinanceiro, pontoFocal, outrosContatos, empresa, publico, diferenciais, referencias, selectedNetworks, networkData, materiaisLinks, musicaSugestao]);

  const copySummary = useCallback(() => {
    navigator.clipboard.writeText(buildSummary()).then(() => alert("Resumo copiado."));
  }, [buildSummary]);

  const sendWhatsapp = useCallback(() => {
    const text = buildSummary().slice(0, 3000);
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  }, [buildSummary]);

  const audioLabel = useCallback((qid: string): string => {
    const direct = [...EMPRESA_Q, ...PUBLICO_Q, ...DIFERENCIAIS_Q, ...REFERENCIAS_Q].find((q) => q.id === qid);
    if (direct) return direct.label;
    for (const net of selectedNetworks) {
      const q = NETWORK_Q.find((q) => `${net}-${q.id}` === qid);
      if (q) return `${net} — ${q.label}`;
    }
    return qid;
  }, [selectedNetworks]);

  const submitBriefing = useCallback(async () => {
    setSubmitStatus("submitting");
    setSubmitError(null);
    try {
      const audioLinks = await Promise.all(
        Object.entries(audioBlobs).map(async ([qid, blob]) => {
          const pathname = `briefing-audio/${qid}-${crypto.randomUUID()}.webm`;
          await uploadPresigned(pathname, blob, {
            access: "private",
            handleUploadUrl: "/api/blob-upload",
            contentType: blob.type || "audio/webm",
            multipart: true,
          });
          return { qid, label: audioLabel(qid), pathname };
        })
      );

      const res = await fetch("/api/submit-briefing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary: buildSummary(), company: welcome.empresa || "", audioLinks }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setSubmitStatus("success");
      await clearAll();
    } catch {
      setSubmitStatus("error");
      setSubmitError("Não foi possível enviar o briefing. Tente novamente em instantes.");
    }
  }, [audioBlobs, audioLabel, buildSummary, welcome]);

  const stepIndex = useCallback((id: SectionId) => SECTIONS.findIndex((s) => s.id === id), []);
  const currentId = SECTIONS[activeStep].id;

  const value: BriefingContextValue = useMemo(() => ({
    activeStep, setActiveStep, mobileNavOpen, setMobileNavOpen, currentId, stepIndex, progress,
    welcome, setWelcome, cadastro, setCadastro, empresa, setEmpresa, publico, setPublico,
    diferenciais, setDiferenciais, referencias, setReferencias,
    selectedNetworks, toggleNetwork, networkData, setNetField,
    showLinkedinHelp, setShowLinkedinHelp,
    outrosContatos, setOutrosContatos, materiaisLinks, setMateriaisLinks,
    pontoFocal, setPontoFocal, respLegal, setRespLegal, respFinanceiro, setRespFinanceiro,
    musicaSugestao, setMusicaSugestao, checklistDone, setChecklistDone,
    audio, audioBlobs, recordingId, toggleRecord,
    draftStatus, submitStatus, submitError, submitBriefing,
    resetForm, copySummary, sendWhatsapp,
  }), [
    activeStep, mobileNavOpen, currentId, stepIndex, progress,
    welcome, cadastro, empresa, publico, diferenciais, referencias,
    selectedNetworks, toggleNetwork, networkData, setNetField,
    showLinkedinHelp, outrosContatos, materiaisLinks,
    pontoFocal, respLegal, respFinanceiro, musicaSugestao, checklistDone,
    audio, audioBlobs, recordingId, toggleRecord,
    draftStatus, submitStatus, submitError, submitBriefing,
    resetForm, copySummary, sendWhatsapp,
  ]);

  return <BriefingContext.Provider value={value}>{children}</BriefingContext.Provider>;
}
