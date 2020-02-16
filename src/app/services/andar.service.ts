import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Andares } from '../models/Andares';
import { API_URL } from 'src/environments/API_URL';

@Injectable({
  providedIn: 'root'
})
export class AndarService {

  constructor(private http: HttpClient) { }

  getAll(andarId?: number, sedeId?: any, blocoId?: any, descricao?: string, ativo?: any) {
    var r = this.http.get<Andares[]>(`${API_URL}/api/andares?andarId=${andarId != null ? andarId : ''}&sedeId=${sedeId != null ? sedeId : ''}&blocoId=${blocoId != null ? blocoId : ''}&descricao=${descricao}&ativo=${ativo}`);
    return r;
  }

  insert(andares: Andares) {
    return this.http.post<Andares>(`${API_URL}/api/andares`, andares);
  }

  delete(id: any) {
    return this.http.delete<void>(`${API_URL}/api/andares?andarId=${id}`);
  }

  edit(andares: Andares) {
    return this.http.put<Andares>(`${API_URL}/api/andares`, andares);
  }

}
