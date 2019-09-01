export class BloqueioQuiosque {
    bloqueioQuiosqueId: number | null;

    descricao: string;

    sedeId: number | null;

    dataInicio: Date;

    dataFim: Date;

    justificativa: string;

    usuarioIdInclusao: number;

    dataInclusao: Date | string;

    usuarioIdAlteracao: number | null;

    dataAlteracao: Date | string;

    usuarioIdExclusao: number | null;
    dataExclusao: Date | string | null;

    ativo: boolean;

    nomeSede: string;

    nomeInclusao: string | null;

    nomeAlteracao: string | null;

    nomeExclusao: string | null;

    chave: string;
}
