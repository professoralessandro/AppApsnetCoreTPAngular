export class Usuarios {
    usuarioId: string;
    usuario: string;
    senha: string;
    nome: string;
    email: string;
    telefone: string;
    trocaSenha: boolean;
    bloqueado: boolean;
    dataUltimaTrocaSenha?: Date;
    dataUltimoLogin?: Date;
    CRM: string;
}
