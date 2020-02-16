import { Injectable } from '@angular/core';
import { LocaisReserva } from '../models/LocaisReserva';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/environments/API_URL';

@Injectable({
  providedIn: 'root'
})
export class LocaisReservaService {

  constructor(private http: HttpClient) { }

  getAll(localReservaId?: number, descricao?: string, ativo?: boolean) {
    return this.http.get<LocaisReserva[]>(`${API_URL}/api/locaisreserva?localReservaId=${localReservaId != null ? localReservaId : ''}&descricao=${descricao}&ativo=${ativo}`);
  }

  insert(locaisReserva: LocaisReserva) {
    return this.http.post<LocaisReserva>(`${API_URL}/api/locaisreserva`, locaisReserva);
  }

  delete(id: any) {
    return this.http.delete<void>(`${API_URL}/api/locaisreserva?localReservaId=${id}`);
  }

  edit(locaisReserva: LocaisReserva) {
    return this.http.put<LocaisReserva>(`${API_URL}/api/locaisReserva`, locaisReserva);
  }
}
