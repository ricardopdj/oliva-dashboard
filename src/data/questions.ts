export interface Question {
  id: string;
  label: string;
}

export const EMPRESA_Q: Question[] = [
  { id: "e1", label: "Em uma frase, o que a empresa vende ou faz?" },
  { id: "e2", label: "Há quanto tempo a empresa existe, e o que mudou desde que começou até hoje?" },
  { id: "e3", label: "Tem algo que vocês NÃO querem que apareça na comunicação da empresa?" },
];

export const PUBLICO_Q: Question[] = [
  { id: "p1", label: "Quem é a pessoa que mais compra ou contrata vocês hoje? Descreva alguém real, não um perfil ideal." },
  { id: "p2", label: "Como essa pessoa costuma chegar até vocês?" },
  { id: "p3", label: "O que essa pessoa fala quando indica vocês para alguém? Se puder, repita quase palavra por palavra." },
  { id: "p4", label: "Já teve alguma reclamação ou dúvida que se repete bastante entre os clientes?" },
];

export const DIFERENCIAIS_Q: Question[] = [
  { id: "d1", label: "O que os clientes elogiam que talvez nem seja o motivo principal pelo qual venderam o serviço?" },
  { id: "d2", label: "Tem alguma história de bastidor, cliente satisfeito ou causo que a equipe sempre conta?" },
  { id: "d3", label: "Se um concorrente tentasse copiar vocês, o que ele NUNCA conseguiria copiar de verdade?" },
  { id: "d4", label: "Quem são as pessoas por trás da empresa que topariam aparecer em conteúdo?" },
];

export const REFERENCIAS_Q: Question[] = [
  { id: "r1", label: "Pelo menos 3 referências de perfis que vocês OLHAM E QUEREM SER ASSIM (cole os links)" },
  { id: "r2", label: "Pelo menos 2 referências de perfis que vocês definitivamente NÃO querem parecer" },
];

export const NETWORK_Q: Question[] = [
  { id: "acesso", label: "Login e senha (ou acesso de administrador) dessa rede" },
  { id: "existente", label: "Essa rede já existe? O que funciona hoje e o que trava?" },
  { id: "objetivo", label: "Qual objetivo essa rede especifica deveria cumprir?" },
  { id: "voz", label: "Se essa rede pudesse falar com a cara de alguém da empresa, quem seria?" },
  { id: "aprovador", label: "Quem vai aprovar os posts dessa rede antes de publicar?" },
];

export const NETWORK_Q_NO_ACESSO: Question[] = NETWORK_Q.filter((q) => q.id !== "acesso");
