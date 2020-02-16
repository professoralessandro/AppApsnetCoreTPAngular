import { Injectable } from '@angular/core';
import { Sedes } from '../models/Sedes';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/environments/API_URL';
import { SedeImagens } from '../models/SedeImagens';

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  constructor(private http: HttpClient) { }

  getAll(sedeId?: number, titulo?: string, ativo?: any) {
    return this.http.get<Sedes[]>(`${API_URL}/api/sedes?sedeId=${sedeId != null ? sedeId : ''}&unidade=${titulo != null ? titulo : ''}&ativo=${ativo}`);
  }

  insert(sedes: Sedes) {
    return this.http.post<Sedes>(`${API_URL}/api/sedes`, sedes);
  }

  delete(id: any) {
    return this.http.delete<void>(`${API_URL}/api/sedes?sedeId=${id}`);
  }

  edit(sede: Sedes) {
    return this.http.put<Sedes>(`${API_URL}/api/sedes`, sede);
  }

  insertImagens(sedeImagens: SedeImagens) {
    return this.http.post<SedeImagens>(`${API_URL}/api/sedeImagens`, sedeImagens);
  }

  listImagens(sedeId: number) {
    debugger;
    return this.http.get<SedeImagens[]>(`${API_URL}/api/sedeImagens?sedeId=${sedeId}`);
  }

  deleteImagens(sedeImagemIDs: string) {
    return this.http.delete<string[]>(`${API_URL}/api/sedeImagens?sedeImagemIDs=${sedeImagemIDs}`);
  }
}



