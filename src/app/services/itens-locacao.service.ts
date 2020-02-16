import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItensLocacaoTabelas } from '../models/ItensLocacaoTabelas';
import { API_URL } from 'src/environments/API_URL';

@Injectable({
  providedIn: 'root'
})
export class ItensLocacaoService {

  constructor(private http: HttpClient) { }

  getAll(id?: number, descricao?: string, sedeId?: number, tipoItemId?: number, ativo?: boolean) {
    // tslint:disable-next-line: max-line-length
    return this.http.get<ItensLocacaoTabelas[]>(`${API_URL}/api/ItensLocacaoTabelas?itensLocacaoTabelaId=${id != null ? id : ''}&descricao=${descricao != null ? descricao : ''}&sedeId=${sedeId != 0 ? sedeId : ''}&tipoItemId=${tipoItemId != null ? tipoItemId : ''}&ativo=${ativo != null ? ativo : ''}`);
  }

  insert(mail: ItensLocacaoTabelas) {
    return this.http.post<ItensLocacaoTabelas>(`${API_URL}/api/ItensLocacaoTabelas`, mail).toPromise();
  }

  delete(id: number) {
    return this.http.delete<void>(`${API_URL}/api/ItensLocacaoTabelas?itensLocacaoTabelasId=${id}`);
  }

  edit(feed: ItensLocacaoTabelas) {
    return this.http.put<ItensLocacaoTabelas>(`${API_URL}/api/ItensLocacaoTabelas`, feed);
  }
}

