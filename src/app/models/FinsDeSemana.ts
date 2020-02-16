export class FimdeSemana {

  fimSemanaId: number;

  sedeId: number;

  data: Date;

  descricao: string;

  usuarioIdInclusao: number;

  dataInclusao: Date | string;

  usuarioIdAlteracao: number;

  dataAlteracao: Date | string;

  usuarioIdExclusao: number | null;
  dataexclusao: Date | string | null;

  ativo: boolean;

  nomeSede: string;
}
