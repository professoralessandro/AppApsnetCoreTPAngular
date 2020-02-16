export class Quiosques {
  quiosqueId: number;

  sedeId: number;

  numeroQuiosque: number;

  imagem: string;

  usuarioIdInclusao: number;

  dataInclusao: Date | string;

  usuarioIdAlteracao: number;

  dataAlteracao: Date | string;

  usuarioIdExclusao: number | null;

  dataExclusao: Date | string | null;

  ativo: boolean;

  nomeSede: string;
}
