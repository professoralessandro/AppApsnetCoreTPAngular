import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Autores } from '../models/Autor';
import { API_URL } from 'src/environments/API_URL';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  constructor(private http: HttpClient) { }

  getAll(autorId?: number, nome?: string, email?: string) {
    debugger;
    var r = this.http.get<Autores[]>(`${API_URL}/api/autores?autorId=${autorId != null ? autorId : ''}&descricao=${nome}&ativo=${email}`);
    return r;
  }

  insert(autores: Autores) {
    debugger;
    return this.http.post<Autores>(`${API_URL}/api/autores`, autores);
  }

  delete(id: any) {
    debugger;
    return this.http.delete<void>(`${API_URL}/api/autores?autorId=${id}`);
  }

  edit(autores: Autores) {
    debugger;
    return this.http.put<Autores>(`${API_URL}/api/autores`, autores);
  }

}
