import { Injectable } from '@angular/core';
import { BloqueioQuiosque } from '../models/BloqueioQuiosque';
import { API_URL } from 'src/environments/API_URL';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuiosqueBloqueioService {

  constructor(private http: HttpClient) { }

  getAll(id?: number, descricao?: string, sedeId?: number, justificativa?: string, datainicio?: Date, datafim?: Date, ativo?: boolean) {
    // tslint:disable-next-line: max-line-length
    return this.http.get<BloqueioQuiosque[]>(`${API_URL}/api/bloqueioquiosques?bloqueioQuiosqueId=${id != null ? id : ''}&descricao=${descricao != null ? descricao : ''}&sedeId=${sedeId != 0 ? sedeId : ''}&justificativa=${justificativa != null ? justificativa : ''}&datainicio=${datainicio != null ? datainicio : ''}&datafim=${datafim != null ? datafim : ''}&ativo=${ativo != null ? ativo : ''}`);
  }

  insert(mail: BloqueioQuiosque) {
    return this.http.post<BloqueioQuiosque>(`${API_URL}/api/bloqueioquiosques`, mail).toPromise();
  }

  delete(id: number) {

    return this.http.delete<void>(`${API_URL}/api/bloqueioquiosques?bloqueioQuiosqueId=${id}`);
  }

  edit(feed: BloqueioQuiosque) {
    return this.http.put<BloqueioQuiosque>(`${API_URL}/api/bloqueioquiosques`, feed).toPromise();
  }

  buscarQuiosqueQuiosque(id: number) {
    return this.http.get<BloqueioQuiosque[]>(`${API_URL}/api/BloqueioQuiosqueQuiosques?bloqueioquiosqueId=${id != null ? id : ''}`);
  }
}
