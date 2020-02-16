
export class RepositorioMidias {

    repositorioMidiaId: number;

    descricao: string;

    usuarioIdInclusao: number;

    dataInclusao: Date | string;

    usuarioIdAlteracao: number;

    dataAlteracao: Date | string;

    usuarioIdExclusao: number | null;

    dataExclusao: Date | string | null;

    ativo: boolean;
}