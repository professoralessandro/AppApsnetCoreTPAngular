export class Churrasqueiras {

    ChurrasqueiraId: number;

    SedeId: number;

    Descricao: string;

    QtdMinimaPessoas: number;

    QtdMaximaPessoas: number;

    Imagem: string;

    UsuarioIdInclusao: number;

    DataInclusao: Date | string;

    UsuarioIdAlteracao: number;

    DataAlteracao: Date | string;

    UsuarioIdExclusao: number | null;
    DataExclusao: Date | string | null;

    Ativo: boolean;

    NomeSede: string;
}