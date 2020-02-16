export class MailingMails {
    mailingEmailId: number;
    descricao: string;
    assunto: string;
    cabecalho: string;
    mensagem: string;
    assinatura: string;
    dataInclusao: Date;
    dataAlteracao: Date;
    dataExclusao: Date;
    usuarioIdInclusao: number;
    usuarioIdAlteracao: number;
    usuarioIdExclusao: number;
    ativo: boolean;
    usuarioResponsavelEnvio: string;
    usuarioResponsavelCadastro: string;
    nomeLote: string;
    mensagemId: number;
}
