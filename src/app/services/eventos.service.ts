import { Injectable } from '@angular/core';
import { Feed } from '../models/Feed';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/environments/API_URL';
import { Eventos } from '../models/Eventos';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  constructor(private http: HttpClient) { }

  getAllAtivos() {
    return this.http.get<Eventos[]>(`${API_URL}/api/eventos/ativos`);
  }
}
