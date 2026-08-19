import { createContext, type Dispatch, type SetStateAction } from "react";
import type { SectionId } from "../data/sections";
import type {
  BriefingFormState, ContatoData, FieldValues, MaterialLink, WelcomeData,
} from "./types";

export interface BriefingContextValue extends BriefingFormState {
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  mobileNavOpen: boolean;
  setMobileNavOpen: Dispatch<SetStateAction<boolean>>;
  currentId: SectionId;
  stepIndex: (id: SectionId) => number;
  progress: number;

  setWelcome: Dispatch<SetStateAction<WelcomeData>>;
  setCadastro: Dispatch<SetStateAction<FieldValues>>;
  setEmpresa: Dispatch<SetStateAction<FieldValues>>;
  setPublico: Dispatch<SetStateAction<FieldValues>>;
  setDiferenciais: Dispatch<SetStateAction<FieldValues>>;
  setReferencias: Dispatch<SetStateAction<FieldValues>>;
  toggleNetwork: (net: string) => void;
  setNetField: (net: string, field: string, val: string | boolean) => void;
  setShowLinkedinHelp: Dispatch<SetStateAction<boolean>>;
  setOutrosContatos: Dispatch<SetStateAction<ContatoData[]>>;
  setMateriaisLinks: Dispatch<SetStateAction<MaterialLink[]>>;
  setPontoFocal: Dispatch<SetStateAction<FieldValues>>;
  setRespLegal: Dispatch<SetStateAction<FieldValues>>;
  setRespFinanceiro: Dispatch<SetStateAction<FieldValues>>;
  setMusicaSugestao: Dispatch<SetStateAction<string>>;
  setChecklistDone: Dispatch<SetStateAction<boolean[]>>;

  audio: Record<string, string>;
  audioBlobs: Record<string, Blob>;
  recordingId: string | null;
  toggleRecord: (qid: string) => void;

  draftStatus: "idle" | "saving" | "saved" | "error";
  submitStatus: "idle" | "submitting" | "success" | "error";
  submitError: string | null;
  submitBriefing: () => void;

  resetForm: () => void;
  copySummary: () => void;
  sendWhatsapp: () => void;
}

export const BriefingContext = createContext<BriefingContextValue | null>(null);
