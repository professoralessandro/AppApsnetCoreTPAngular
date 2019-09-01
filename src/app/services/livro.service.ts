import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Livros } from '../models/Livro';
import { API_URL } from 'src/environments/API_URL';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  constructor(private http: HttpClient) { }

  getAll(livroId?: number, sedeId?: any, nome?: string, autor?: string) {
    debugger;
    var r = this.http.get<Livros[]>(`${API_URL}/api/livros?livroId=${livroId != null ? livroId : ''}&nome=${nome != null ? nome : ''}&autor=${autor != null ? livroId : ''}`);
    return r;
  }

  insert(livros: Livros) {
    debugger;
    return this.http.post<Livros>(`${API_URL}/api/livros`, livros);
  }

  delete(id: any) {
    debugger;
    return this.http.delete<void>(`${API_URL}/api/livros?livroId=${id}`);
  }

  edit(livros: Livros) {
    debugger;
    return this.http.put<Livros>(`${API_URL}/api/livros`, livros);
  }

}
