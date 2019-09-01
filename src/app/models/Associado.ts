import { AssociadoBloqueio } from './AssociadoBloqueio';
export class AssociadoPG
{
  totalItems: number;
  items: Associado[];
}

export class Associado {
  associadoId: number;
  codTitular?: any;
  sequenciaDependente?: any;
  nrFuncional: string;
  nome: string;
  email: string;
  tipoPessoa: string;
  associadoIdPai?: any;
  dataNascimento: string;
  sexo: string;
  estadoCivil: string;
  dtInicioFeriasLicensa?: string;
  tipoDocumento: string;
  cpf: string;
  departamento: string;
  codDepartamento: string;
  localTrabalho: string;
  poloAdministrativo: string;
  codEmpresa: string;
  indFolha: string;
  banco: string;
  agencia: string;
  contaCorrente: string;
  contaCorrenteDig: string;
  imagem: string;
  telefone: string;
  senha: string;
  trocaSenha: boolean;
  bloqueado: boolean;
  dataInclusao: Date;
  dataUltimaAlteracao: Date;
  dataUltimaTrocaSenha: Date;
  dataUltimoLogin: string;
  ativo: boolean;
  primeiroAcesso: boolean;
  statusAprovacaoId: number;
  faixaSalarial: string;
  exibeTourInscricao: boolean;
  tipoDependente?: any;
  exibeTourIngresso: boolean;
  permiteEmailComunicacoes: boolean;
  origemBanco: boolean;
  associadosDocumentos: any[];
  associadosFluxo: any[];
  bloqueioPrimeiroAcesso: any[];
  eventosInscricoes: any[];
  examesAssociadosVisitantes: any[];
  lancamentos: any[];
  dependentes: Associado[];
  associadoBloqueios: AssociadoBloqueio[];
  infoBloqueio: AssociadoBloqueio
}
