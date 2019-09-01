export class ConfiguracaoReservaQuiosques {
        configuracaoReservaQuiosqueId: number;

        sedeId: number;

        descricao: string;

        termoresponsabilidade: string;

        dataInicial: Date | string;

        horarioLimiteNoshow: string;

        qtdPessoasQuiosque: number;

        qtdDiasReservaAdm: number;

        usuarioIdInclusao: number;

        dataInclusao: Date | string;

        usuarioIdAlteracao: number;

        dataAlteracao: Date | string;

        usuarioIdExclusao: number | null;
        dataExclusao: Date | string | null;

        ativo: boolean;

}