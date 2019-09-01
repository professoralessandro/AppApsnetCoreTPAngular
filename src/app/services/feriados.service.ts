import { Injectable } from '@angular/core';
import { API_URL } from 'src/environments/API_URL';
import { HttpClient } from '@angular/common/http';
import { Feriados } from '../models/Feriados';

@Injectable({
  providedIn: 'root'
})
export class FeriadosService {
  constructor(private http: HttpClient) { }

  getAll(id?: number, sedeId?: number, data?: Date, descricao?: String, ativo?: boolean) {
// tslint:disable-next-line: max-line-length
    return this.http.get<Feriados[]>(`${API_URL}/api/feriados?feriadoId=${id != null ? id : ''}&sedeId=${sedeId != null ? sedeId : ''}&data=${data != null ? data : ''}&descricao=${descricao != null ? descricao : ''}&ativo=${ativo != null ? ativo : ''}`);
  }

  insert(mail: Feriados) {
    return this.http.post<Feriados>(`${API_URL}/api/feriados`, mail).toPromise();
  }

  delete(id: number) {

    return this.http.delete<void>(`${API_URL}/api/feriados?feriadoId=${id}`);
  }

  edit(feed: Feriados) {
    return this.http.put<Feriados>(`${API_URL}/api/feriados`, feed);
  }
}
