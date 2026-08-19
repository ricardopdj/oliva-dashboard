import {
  DoorOpen, FileText, Building2, Users, Sparkles, Quote, Link2, Upload, ListChecks, Check,
  type LucideIcon,
} from "lucide-react";

export type SectionId =
  | "boasvindas"
  | "cadastro"
  | "empresa"
  | "publico"
  | "diferenciais"
  | "referencias"
  | "redes"
  | "materiais"
  | "checklist"
  | "resumo";

export interface Section {
  id: SectionId;
  label: string;
  icon: LucideIcon;
}

export const SECTIONS: Section[] = [
  { id: "boasvindas", label: "Boas-vindas", icon: DoorOpen },
  { id: "cadastro", label: "Dados cadastrais", icon: FileText },
  { id: "empresa", label: "Sobre a empresa", icon: Building2 },
  { id: "publico", label: "Sobre o público", icon: Users },
  { id: "diferenciais", label: "Diferenciais", icon: Sparkles },
  { id: "referencias", label: "Referências", icon: Quote },
  { id: "redes", label: "Redes sociais", icon: Link2 },
  { id: "materiais", label: "Materiais e links", icon: Upload },
  { id: "checklist", label: "Checklist onboarding", icon: ListChecks },
  { id: "resumo", label: "Resumo final", icon: Check },
];
