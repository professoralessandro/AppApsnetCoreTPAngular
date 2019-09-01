import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/environments/API_URL';
import { TipoServico } from '../models/TipoServico';

@Injectable({
  providedIn: 'root'
})
export class TipoServicoService {

  constructor(private http: HttpClient) { }

  getAll(tipoServicoId?: any, descricao?: string, ativo?: any) {
    return this.http.get<TipoServico[]>(`${API_URL}/api/tiposervico?tipoServicoId=${tipoServicoId != null ? tipoServicoId : ''}&descricao=${descricao}&ativo=${ativo}`);
  }

  insert(tipoServico: TipoServico) {
    return this.http.post<TipoServico>(`${API_URL}/api/tiposervico`, tipoServico);
  }

  delete(id: any) {
    return this.http.delete<void>(`${API_URL}/api/tiposervico?tipoServicoId=${id}`);
  }

  edit(tipoServico: TipoServico) {
    return this.http.put<TipoServico>(`${API_URL}/api/tiposervico`, tipoServico);
  }
}
