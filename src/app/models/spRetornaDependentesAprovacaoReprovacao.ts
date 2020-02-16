export class spRetornaDependentesAprovacaoReprovacao
{
    workFlowFluxoId: number | null;
    workFlowId: number | null;
    alcadaId: number | null;
    alcada: string | null;
    tipo: string | null;
    nome: string | null;
    dataNascimento?: string | null;
    grauParentesco?: string | null;
    titular?: string | null;
    associadoIdPai: number | null;
    dataFluxo?: Date;
    statusAprovacaoId: number | null;
    ativo: boolean;
    observacao: string;
    usuarioId: number | null;
    registroId: number | null;
}
