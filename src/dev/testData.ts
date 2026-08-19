import type { BriefingFormState } from "../state/types";

export const TEST_NETWORKS = ["Instagram", "LinkedIn"];

export const TEST_DATA: BriefingFormState = {
  welcome: { empresa: "Padaria Trigo Dourado", responsavel: "Ana Souza" },
  cadastro: {
    razaoSocial: "Trigo Dourado Panificação Ltda",
    nomeFantasia: "Padaria Trigo Dourado",
    cnpj: "12.345.678/0001-90",
    inscricaoEstadual: "123.456.789.112",
    inscricaoMunicipal: "987654321",
    endereco: "Rua das Palmeiras, 245 - Centro, São Paulo/SP",
    emailFaturamento: "financeiro@trigodourado.com.br",
  },
  empresa: {
    e1: "Vendemos pães artesanais e doces de padaria, feitos com fermentação natural.",
    e2: "A padaria existe há 8 anos; começou em casa e hoje tem loja física com 6 funcionários.",
    e3: "Não queremos parecer uma rede grande e sem identidade — o tom precisa ser sempre caseiro.",
  },
  publico: {
    p1: "Moradores do bairro que buscam pão fresco todo dia, geralmente famílias.",
    p2: "Boca a boca e Instagram.",
    p3: "Falam que o pão lembra o da vó.",
    p4: "Reclamam que às vezes falta pão de fôrma integral no fim do dia.",
  },
  diferenciais: {
    d1: "O cheiro da padaria de manhã, que os clientes dizem sentir da rua.",
    d2: "Tem uma cliente que vem toda semana desde a inauguração.",
    d3: "A receita de fermentação natural, que é da família.",
    d4: "A Ana, dona, que atende no balcão quase todo dia.",
  },
  referencias: {
    r1: "instagram.com/padariaexemplo1, instagram.com/padariaexemplo2, instagram.com/padariaexemplo3",
    r2: "instagram.com/redegrande1, instagram.com/redegrande2",
  },
  selectedNetworks: TEST_NETWORKS,
  networkData: {
    Instagram: {
      acesso: "usuario_ig / senha123",
      existente: "Já existe, mas está parado há meses.",
      objetivo: "Gerar reconhecimento de marca e vendas.",
      voz: "A dona da padaria, Ana.",
      aprovador: "Ana Souza",
    },
    LinkedIn: {
      existente: "Não existe ainda.",
      objetivo: "Atrair fornecedores e parcerias B2B.",
      voz: "O time comercial.",
      aprovador: "Ana Souza",
      confirmouAcesso: true,
    },
  },
  showLinkedinHelp: false,
  outrosContatos: [
    { nome: "Bruno Ferreira", celular: "(11) 99999-1111", email: "bruno@trigodourado.com.br", cargo: "Gerente" },
  ],
  materiaisLinks: [
    { nome: "Identidade Visual", conteudo: "Logo, paleta de cores e fontes da marca.", link: "https://drive.google.com/exemplo" },
  ],
  pontoFocal: { nome: "Ana Souza", celular: "(11) 91234-5678", email: "ana@trigodourado.com.br", cargo: "Sócia-fundadora" },
  respLegal: { nome: "Ana Souza", cpf: "123.456.789-00", telefone: "(11) 91234-5678", email: "ana@trigodourado.com.br" },
  respFinanceiro: { nome: "Carlos Lima", cpf: "987.654.321-00", telefone: "(11) 99876-5432", email: "financeiro@trigodourado.com.br" },
  musicaSugestao: "Águas de Março — Elis Regina",
  checklistDone: [true, true, false, false, false, false, false],
};
