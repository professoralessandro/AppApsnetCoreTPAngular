export class Eventos
{
    eventoId: number;

    titulo: string;

    tituloInt: string;

    maxPessoas: number | null;

    qtdeAssociados: number | null;

    qtdeDependentes: number | null;

    qtdeVisitantes: number | null;

    tipoInscricao: string;

    descricaoPortal: string;

    descricao: string;

    inscricaoDataHoraInicio: Date | string | null;

    inscricaoDataHoraTermino: Date | string | null;

    dataHoraInicio: Date | string;

    dataHoraTermino: Date | string | null;

    publico: boolean;

    valorTaxa: number | null;

    usuarioId: number;

    imagem: string;

    ativo: boolean;
}
