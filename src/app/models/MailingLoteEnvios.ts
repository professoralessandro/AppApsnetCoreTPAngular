export class MailingLoteEnvios {
    mailingLoteEnvioId: number;
    nomeLote: string;
    mailingEmailId: number;
    dataEnvio: Date;
    responsavelEnvio: number;
    statuId: number;
    statusDescricao: string;
    dataCadastroFormatada: string;
    dataEnvioFormatada: string;
    usuarioIdInclusao: number;
    dataInclusao: Date;
    usuarioIdAlteracao: number;
    dataAlteracao: Date;
    usuarioIdExclusao: number;
    dataExclusao: Date;
    ativo: boolean;
    enviarTodos: boolean;
    qtdEnvios: number;
    usuarioResponsavelEnvio: string;
    usuarioResponsavelCadastro: string;
    mensagemId: number;
}