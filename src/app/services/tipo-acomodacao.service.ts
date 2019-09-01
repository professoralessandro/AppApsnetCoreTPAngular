import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoAcomodacoes } from '../models/TipoAcomodacoes';
import { API_URL } from 'src/environments/API_URL';

@Injectable({
  providedIn: 'root'
})
export class TipoAcomodacaoService {

  constructor(private http: HttpClient) { }

  getAll(tipoAcomodacaoId?: number, descricao?: string, ativo?: any) {
    return this.http.get<TipoAcomodacoes[]>(`${API_URL}/api/tipoacomodacoes?tipoAcomodacaoId=${tipoAcomodacaoId != null ? tipoAcomodacaoId : ''}&descricao=${descricao}&ativo=${ativo}`);
  }

  insert(tipoAcomodacao: TipoAcomodacoes) {
    return this.http.post<TipoAcomodacoes>(`${API_URL}/api/tipoacomodacoes`, tipoAcomodacao);
  }

  delete(id: any) {
    return this.http.delete<void>(`${API_URL}/api/tipoacomodacoes?tipoAcomodacaoId=${id}`);
  }

  edit(tipoAcomodacoes: TipoAcomodacoes) {
    return this.http.put<TipoAcomodacoes>(`${API_URL}/api/tipoacomodacoes`, tipoAcomodacoes);
  }
}
