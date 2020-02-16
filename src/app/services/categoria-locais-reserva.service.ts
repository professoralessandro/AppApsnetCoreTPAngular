import { Injectable } from '@angular/core';
import { API_URL } from 'src/environments/API_URL';
import { HttpClient } from '@angular/common/http';
import { LocaisReservaCategorias } from '../models/LocaisReservaCategorias';

@Injectable({
  providedIn: 'root'
})
export class CategoriaLocaisReservaService {

  constructor(private http: HttpClient) { }

  getAll(localReservaCategoriaId?: number, titulo?: string, ativo?: any) {
    return this.http.get<LocaisReservaCategorias[]>(`${API_URL}/api/locaisreservacategorias?localReservaCategoriaId=${localReservaCategoriaId != null ? localReservaCategoriaId : ''}&titulo=${titulo}&ativo=${ativo}`);
  }

  insert(categorias: LocaisReservaCategorias) {
    return this.http.post<LocaisReservaCategorias>(`${API_URL}/api/locaisreservacategorias`, categorias);
  }

  delete(id: any) {
    return this.http.delete<void>(`${API_URL}/api/locaisreservacategorias?localReservaCategoriaId=${id}`);
  }

  edit(categorias: LocaisReservaCategorias) {
    return this.http.put<LocaisReservaCategorias>(`${API_URL}/api/locaisreservacategorias`, categorias);
  }
}
