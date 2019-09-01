export class AssociadoBloqueio { 
    associadoBloqueioId: number;
    associadoId: number;
    motivo: string;
    dataBloqueio: Date;
    dataDesbloqueio: Date;
    usuarioIdBloqueio: number;
    usuarioIdDesbloqueio?: any;
}