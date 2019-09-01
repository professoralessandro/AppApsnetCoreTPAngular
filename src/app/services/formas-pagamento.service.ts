import { Injectable } from '@angular/core';
import { FormasPagamento } from '../models/FormasPagamento';
import { API_URL } from 'src/environments/API_URL';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FormasPagamentoService {
  // int? formaPagamentoId,
  // string descricao,
  // bool? ativo
  constructor(private http: HttpClient) { }

  getAll(id?: number,descricao?: String, ativo?: boolean) {
// tslint:disable-next-line: max-line-length
    return this.http.get<FormasPagamento[]>(`${API_URL}/api/formasPagamento?formaPagamentoId=${id != null ? id : ''}&descricao=${descricao != null ? descricao : ''}&ativo=${ativo != null ? ativo : ''}`);
  }

  insert(mail: FormasPagamento) {
    return this.http.post<FormasPagamento>(`${API_URL}/api/formasPagamento`, mail).toPromise();
  }

  delete(id: number) {
    return this.http.delete<void>(`${API_URL}/api/formasPagamento?formaPagamentoId=${id}`);
  }

  edit(feed: FormasPagamento) {
    return this.http.put<FormasPagamento>(`${API_URL}/api/formasPagamento`, feed);
  }
  
}
