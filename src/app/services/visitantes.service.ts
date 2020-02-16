import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/environments/API_URL';
import { Visitantes } from '../models/Visitantes';
import { environment } from '@environments/environment';


@Injectable({
  providedIn: 'root'
})
export class VisitantesService {

  constructor(private http: HttpClient) { }

  getAll(visitanteId?: number, nome?: string, cpf?: string, ativo?: boolean, tipoPessoa?: string) {
    return this.http.get<Visitantes[]>(`${API_URL}/api/visitantes?visitanteId=${visitanteId != null ? visitanteId : ''}&nome=${nome != null ? nome : ''}&cpf=${cpf != null ? cpf : ''}&ativo=${ativo != null ? ativo : ''}&tipoPessoa=${tipoPessoa != null ? tipoPessoa : ''}`);
  }

  insert(visitantes: Visitantes) {
    return this.http.post<Visitantes>(`${API_URL}/api/visitantes`, visitantes);
  }

  delete(visitanteId: any) {
    return this.http.delete<void>(`${API_URL}/api/visitantes?visitanteId=${visitanteId != null ? visitanteId : ''}`);
  }

  edit(visitantes: Visitantes) {
    return this.http.put<Visitantes>(`${API_URL}/api/visitantes`, visitantes);
  }
}
