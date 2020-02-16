import { Injectable } from '@angular/core';
import { API_URL } from 'src/environments/API_URL';
import { HttpClient, HttpParams } from '@angular/common/http';
import { QuiosqueOperacional } from 'src/app/models/QuiosqueOperacinal';
import { QuiosqueReserva } from 'src/app/models/QuiosqueReserva';
import { environment } from 'src/environments/environment';
import { BaseResult } from '../_helpers/BaseResult';
import { QuiosqueAtribuidos } from '../models/QuiosqueAtribuidos';
import { QuiosqueDisponivelSubstitucao } from '../models/QuiosqueDisponivelSubstituicao';
import { QuiosqueReservaDatas } from '../models/QuiosqueReservaDatas';
import { QuiosqueReservaVigente } from '../models/QuiosqueReservaVigente';

@Injectable({
    providedIn: 'root'
})

export class QuiosqueService {

    constructor(private http: HttpClient) { }

    // tslint:disable-next-line: max-line-length
    getAll(nome?: string, cpf?: string, numeroReserva?: number, unidade?: number, statusReserva?: string, dataInicio?: Date, dataFim?: Date) {
        // tslint:disable-next-line: max-line-length
        return this.http.get<BaseResult<QuiosqueOperacional>>(`${environment.quiosque_url}/api/quiosque?OpcaoBusca=Reserva&AssociadoNome=${nome}&cpf=${cpf}&ReservaQuiosqueId=${numeroReserva != null ? numeroReserva : ''}&SedeId=${unidade !== 0 ? unidade : ''}&StatusReserva=${statusReserva != null ? statusReserva : ''}&DataInicial=${dataInicio != null ? dataInicio : ''}&DataFinal=${dataFim != null ? dataFim : ''}`);
    }

    getQuiosqueAtribuidos(reservaQuiosqueId: number) {
        // tslint:disable-next-line: max-line-length
        return this.http.get<BaseResult<QuiosqueAtribuidos>>(`${environment.quiosque_url}/api/ReservaQuiosqueAtribuidos/${reservaQuiosqueId}`);
    }

    getQuiosqueDisponivelSubstituicao(reservaQuiosqueId: number) {
        // tslint:disable-next-line: max-line-length
        return this.http.get<BaseResult<QuiosqueDisponivelSubstitucao>>(`${environment.quiosque_url}/api/Quiosque/disponivel/substituicao/${reservaQuiosqueId}`);
    }

    getDatasBloqueadas(sedeId: number, dataInicio: string, dataFinal: string) {
        // tslint:disable-next-line: max-line-length
        return this.http.get<BaseResult<QuiosqueReservaDatas>>(`${environment.quiosque_url}/api/Quiosque/datas/bloqueadas?sedeId=${sedeId}&dataInicio=${dataInicio}&dataFinal=${dataFinal}`);
    }

    getReservaVigente(sedeId: number, DataInicial: string) {
        // tslint:disable-next-line: max-line-length
        return this.http.get<QuiosqueReservaVigente>(`${environment.quiosque_url}/api/ConfiguracaoReservaQuiosque/vigente?sedeId=${sedeId}&dataInicial=${DataInicial}`);
    }

    reservar(quiosque: QuiosqueReserva) {
        // tslint:disable-next-line: max-line-length
        return this.http.post<QuiosqueReserva>(`${environment.quiosque_url}/api/quiosque/reservar`, quiosque).toPromise();
    }

    alterarQuiosque(
        _reservaQuiosqueId: number,
        _outraReservaQuiosqueId: number,
        _novoQuiosqueId: number
    ) {

    return this.http.put(`${environment.quiosque_url}/api/ReservaQuiosqueAtribuidos/alterar/acomodacao?reservaQuiosqueId=${_reservaQuiosqueId}&outraReservaQuiosqueId=${_outraReservaQuiosqueId == null ? '' : _outraReservaQuiosqueId}&novoQuiosqueId=${_novoQuiosqueId}`, {});
    }
}
