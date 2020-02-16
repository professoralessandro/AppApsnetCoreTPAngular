import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoItens } from '../models/TipoItens';
import { API_URL } from 'src/environments/API_URL';

@Injectable({
  providedIn: 'root'
})
export class TipoItensService {

  constructor(private http: HttpClient) { }

  getAll(id?: number, descricao?: string, ativo?: boolean, chave?: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.get<TipoItens[]>(`${API_URL}/api/tipoitens?tipoItemId=${id != null ? id : ''}&descricao=${descricao != null ? descricao : ''}&ativo=${ativo != null ? ativo : ''}
    &chave=${chave != null ? chave : ''}`);
  }

  insert(mail: TipoItens) {
    return this.http.post<TipoItens>(`${API_URL}/api/tipoitens`, mail).toPromise();
  }

  delete(id: number) {

    return this.http.delete<void>(`${API_URL}/api/tipoitens?tipoitensId=${id}`);
  }

  edit(feed: TipoItens) {
    return this.http.put<TipoItens>(`${API_URL}/api/tipoitens`, feed);
  }
}
