import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categorias } from '../models/Categorias';
import { API_URL } from 'src/environments/API_URL';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  constructor(private http: HttpClient) { }

  getAll(id?: number, titulo?: string, ativo?: boolean) {
    return this.http.get<Categorias[]>(`${API_URL}/api/categorias?categoriaId=${id != null ? id : ''}&titulo=${titulo != null ?
      titulo : ''}&ativo=${ativo != null ? ativo : ''}`);
  }

  insert(mail: Categorias) {
    return this.http.post<Categorias>(`${API_URL}/api/categorias`, mail).toPromise();
  }

  delete(id: number) {

    return this.http.delete<void>(`${API_URL}/api/categorias?categoriaId=${id}`);
  }

  edit(feed: Categorias) {
    return this.http.put<Categorias>(`${API_URL}/api/categorias`, feed);
  }
}
