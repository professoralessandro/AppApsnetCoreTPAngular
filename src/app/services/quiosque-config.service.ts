import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfiguracaoReservaQuiosques } from '../models/ConfiguracaoReservaQuiosques';
import { API_URL } from 'src/environments/API_URL';

@Injectable({
  providedIn: 'root'
})
export class QuiosqueConfigService {

  constructor(private http: HttpClient) { }

  getAll(id?: number, descricao?: string, sedeId?: number, ativo?: boolean) {
    return this.http.get<ConfiguracaoReservaQuiosques[]>(`${API_URL}/api/configuracaoreservaquiosques?configuracaoReservaQuiosqueId=${id != null ? id : ''}&descricao=${descricao != null ?
      descricao : ''}&sedeId=${sedeId != 0 ? sedeId : ''}&ativo=${ativo != null ? ativo : ''}`);
  }

  insert(mail: ConfiguracaoReservaQuiosques) {
    return this.http.post<ConfiguracaoReservaQuiosques>(`${API_URL}/api/configuracaoreservaquiosques`, mail).toPromise();
  }

  delete(id: number) {

    return this.http.delete<void>(`${API_URL}/api/configuracaoreservaquiosques?configuracaoReservaQuiosqueId=${id}`);
  }

  edit(feed: ConfiguracaoReservaQuiosques) {
    return this.http.put<ConfiguracaoReservaQuiosques>(`${API_URL}/api/configuracaoreservaquiosques`, feed);
  }

}
