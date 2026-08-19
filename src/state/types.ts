export interface WelcomeData {
  empresa?: string;
  responsavel?: string;
}

export type FieldValues = Record<string, string>;

export type ContatoData = FieldValues;

export interface MaterialLink {
  nome: string;
  conteudo: string;
  link: string;
}

export type NetworkFieldValues = Record<string, string | boolean>;
export type NetworkData = Record<string, NetworkFieldValues>;

export interface BriefingFormState {
  welcome: WelcomeData;
  cadastro: FieldValues;
  empresa: FieldValues;
  publico: FieldValues;
  diferenciais: FieldValues;
  referencias: FieldValues;
  selectedNetworks: string[];
  networkData: NetworkData;
  showLinkedinHelp: boolean;
  outrosContatos: ContatoData[];
  materiaisLinks: MaterialLink[];
  pontoFocal: FieldValues;
  respLegal: FieldValues;
  respFinanceiro: FieldValues;
  musicaSugestao: string;
  checklistDone: boolean[];
}
