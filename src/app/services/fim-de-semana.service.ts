import { Injectable } from '@angular/core';
import { API_URL } from 'src/environments/API_URL';
import { HttpClient } from '@angular/common/http';
import { FimdeSemana } from '../models/FinsDeSemana';

@Injectable({
  providedIn: 'root'
})
export class FimDeSemanaService {
  constructor(private http: HttpClient) { }

  // Int32? fimSemanaId,
  // string descricao,
  // Int64? sedeId,
  // DateTime? data,
  // Boolean? ativo)

  getAll(id?: number, descricao?: string, sedeId?: number, data?: Date, ativo?: boolean) {
// tslint:disable-next-line: max-line-length
    return this.http.get<FimdeSemana[]>(`${API_URL}/api/finsdeSemana?fimSemanaId=${id != null ? id : ''}&descricao=${descricao != null ? descricao : ''}&sedeId=${sedeId != 0 ? sedeId : ''}&data=${data != null ? data : ''}&ativo=${ativo != null ? ativo : ''}`);
  }

  insert(mail: FimdeSemana) {
    return this.http.post<FimdeSemana>(`${API_URL}/api/finsdeSemana`, mail).toPromise();
  }

  delete(id: number) {

    return this.http.delete<void>(`${API_URL}/api/finsdeSemana?fimSemanaId=${id}`);
  }

  edit(feed: FimdeSemana) {
    return this.http.put<FimdeSemana>(`${API_URL}/api/finsdeSemana`, feed);
  }
}