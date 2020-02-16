import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Blocos } from '../models/Blocos';
import { API_URL } from 'src/environments/API_URL';

@Injectable({
  providedIn: 'root'
})
export class BlocoService {

  constructor(private http: HttpClient) { }

  getAll(blocoId?: number, sedeId?: number, descricao?: string, ativo?: boolean) {
    if (ativo==null) ativo=true;
    return this.http.get<Blocos[]>(`${API_URL}/api/blocos?blocoId=${blocoId != null ? blocoId : ''}&sedeId=${sedeId != null ? sedeId : ''}&descricao=${descricao}&ativo=${ativo}`);
  }

  

  insert(blocos: Blocos) {
    return this.http.post<Blocos>(`${API_URL}/api/blocos`, blocos);
  }

  delete(id: any) {
    return this.http.delete<void>(`${API_URL}/api/blocos?blocoId=${id}`);
  }

  edit(blocos: Blocos) {
    return this.http.put<Blocos>(`${API_URL}/api/blocos`, blocos);
  }
}
