import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BloqueioFrequentadores } from '../models/BloqueioFrequentadores';
import { API_URL } from 'src/environments/API_URL';

@Injectable({
  providedIn: 'root'
})
export class BloqueioFrequentadoresService {

  constructor(private http: HttpClient) { }
  
  getAll(bloqueioFrequentadorId?: number, frequentadorId?: number, nome?: string, cpf?: string, ativo?: boolean, tipoPessoaId?: number)
  {
    debugger;
    return this.http.get<BloqueioFrequentadores[]>(`${API_URL}/api/bloqueioFrequentadores?bloqueioFrequentadorId=${bloqueioFrequentadorId != null ? bloqueioFrequentadorId : ''}&frequentadorId=${frequentadorId != null ? frequentadorId : ''}&nome=${nome != null ? nome : ''}&cpf=${cpf != null ? cpf : ''}&ativo=${ativo != null ? ativo : ''}&tipoPessoaId=${tipoPessoaId != null ? tipoPessoaId : ''}`);
  }

  getAllWithParameter(bloqueioFrequentadorId?: number, tipoPessoaId?: number, nome?: string, cpf?: string, ativo?: boolean)
  {
    debugger;
    return this.http.get<BloqueioFrequentadores[]>(`${API_URL}/api/bloqueiofrequentadores?bloqueioFrequentadorId=${bloqueioFrequentadorId != null ? bloqueioFrequentadorId : ''}&tipoPessoaId=${tipoPessoaId != null ? tipoPessoaId : ''}&nome=${nome != null ? nome : ''}&cpf=${cpf != null ? cpf : ''}&ativo=${ativo != null ? ativo : ''}`);
  }

  insert(bloqueioFrequentadores: BloqueioFrequentadores) {
    return this.http.post<BloqueioFrequentadores>(`${API_URL}/api/bloqueioFrequentadores`, bloqueioFrequentadores);
  }

  delete(id: any) {
    return this.http.delete<void>(`${API_URL}/api/bloqueioFrequentadores?bloqueioFrequentadorId=${id}`);
  }

  edit(bloqueioFrequentadores: BloqueioFrequentadores) {
    return this.http.put<BloqueioFrequentadores>(`${API_URL}/api/bloqueioFrequentadores`, bloqueioFrequentadores);
  }
}
