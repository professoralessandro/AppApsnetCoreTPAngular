import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/environments/API_URL';
import { Frequentadores } from '../models/Frequentadores';
import { environment } from '@environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FrequentadoresService {

  constructor(private http: HttpClient) { }

  getAll(frequentadorId?: number, nome?: string, cpf?: string, ativo?: boolean)
  {
      return this.http.get<Frequentadores[]>(`${API_URL}/api/frequentadores?frequentadorId=${frequentadorId != null ? frequentadorId : ''}&nome=${nome != null ? nome : ''}&cpf=${cpf != null ? cpf : ''}&ativo=${ativo != null ? ativo : ''}`);
  }

  insert(frequentadores: Frequentadores) {
    return this.http.post<Frequentadores>(`${API_URL}/api/frequentadores`, frequentadores);
  }

  delete(frequentadorId: any) {
    return this.http.delete<void>(`${API_URL}/api/frequentadores?frequentadorId=${frequentadorId != null ? frequentadorId : ''}`);
  }

  edit(frequentadores: Frequentadores) {
    return this.http.put<Frequentadores>(`${API_URL}/api/frequentadores`, frequentadores);
  }
}
