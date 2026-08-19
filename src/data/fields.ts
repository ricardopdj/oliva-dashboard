export interface FieldDef {
  id: string;
  label: string;
}

export const EMPRESA_CADASTRO_FIELDS: FieldDef[] = [
  { id: "razaoSocial", label: "Razão social" },
  { id: "nomeFantasia", label: "Nome fantasia" },
  { id: "cnpj", label: "CNPJ" },
  { id: "inscricaoEstadual", label: "Inscrição estadual (se houver)" },
  { id: "inscricaoMunicipal", label: "Inscrição municipal (se houver)" },
  { id: "endereco", label: "Endereço completo (contrato e nota fiscal)" },
  { id: "emailFaturamento", label: "E-mail para envio de contrato e notas fiscais" },
];

export const RESP_FIELDS: FieldDef[] = [
  { id: "nome", label: "Nome completo" },
  { id: "cpf", label: "CPF" },
  { id: "telefone", label: "Telefone" },
  { id: "email", label: "Email" },
];

export const CADASTRO_FIELDS = EMPRESA_CADASTRO_FIELDS;

export const CONTATO_CAMPOS: FieldDef[] = [
  { id: "nome", label: "Nome" },
  { id: "celular", label: "Celular" },
  { id: "email", label: "E-mail" },
  { id: "cargo", label: "Cargo / área" },
];

export const MATERIAL_CAMPOS: FieldDef[] = [
  { id: "nome", label: "Nome / Título" },
  { id: "conteudo", label: "Descrição do conteúdo" },
  { id: "link", label: "Link" },
];

export const MAX_OUTROS_CONTATOS = 5;
