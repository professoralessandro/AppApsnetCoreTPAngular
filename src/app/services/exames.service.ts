import { Injectable } from '@angular/core';
import { Exames } from '../models/Exames';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/environments/API_URL';

@Injectable({
  providedIn: 'root'
})
export class ExamesService {

  constructor(private http: HttpClient) { }

  getAll(id?: number, titulo?: string, periodo?: number, valorTaxa?: number, ativo?: boolean, chave?: string) {
    return this.http.get<Exames[]>(`${API_URL}/api/exames?exameId=${id != null ? id : ''}&descricao=${titulo != null ?
      titulo : ''}&periodo=${periodo != null ? periodo : ''}&valorTaxa=${valorTaxa != null
        ? valorTaxa : ''}&ativo=${ativo != null ? ativo : ''}&chave=${chave != null ? chave : ''}`);
  }

  insert(mail: Exames) {
    return this.http.post<Exames>(`${API_URL}/api/exames`, mail).toPromise();
  }

  delete(id: number) {

    return this.http.delete<void>(`${API_URL}/api/exames?exameId=${id}`);
  }

  edit(feed: Exames) {
    return this.http.put<Exames>(`${API_URL}/api/exames`, feed);
  }
}
