import { Injectable } from '@angular/core';
import { WorkFlowFluxo } from '../models/WorkfFowFluxo';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/environments/API_URL';
import { environment } from 'src/environments/environment';
import { AssociadoPG } from '@app/models/Associado';
import { BloqueioFrequentadores } from '@app/models/BloqueioFrequentadores';

@Injectable({
  providedIn: 'root'
})
export class BloqueioFrequentadoresService {

  constructor(private http: HttpClient) { }

  getAll(bloqueioFrequentadorId?: number, frequentadorId?: number, ativo?: boolean) {
    return this.http.get<BloqueioFrequentadores[]>(`${API_URL}/api/bloqueiofrequentadores?bloqueioFrequentadorId=${bloqueioFrequentadorId != null ? bloqueioFrequentadorId : ''}&frequentadorId=${frequentadorId != null ? frequentadorId : ''}&ativo=${ativo != null ? ativo : ''}`);
  }

  /*
  getBloqueiosFrequentadores(bloqueioFrequentadorId?: number, tipoPessoaId?: number, nome?: string, cpf?: string, ativo?: boolean)
  {
    debugger;
    return this.http.get<BloqueioFrequentadores[]>(`${API_URL}/api/bloqueiofrequentadores?bloqueioFrequentadorId=${bloqueioFrequentadorId != null ? bloqueioFrequentadorId : ''}&frequentadorId=${frequentadorId != null ? frequentadorId : ''}&ativo=${ativo != null ? ativo : ''}`);
  }
  */

  getAllWithParameter(bloqueioFrequentadorId?: number, frequentadorId?: number, tipoPessoaId?: number, nome?: string, cpf?: string, ativo?: boolean) {
    return this.http.get<BloqueioFrequentadores>(`${API_URL}/api/bloqueiofrequentadores?bloqueioFrequentadorId=${bloqueioFrequentadorId != null ? bloqueioFrequentadorId : ''}&frequentadorId=${frequentadorId != null ? frequentadorId : ''}&tipoPessoaId=${tipoPessoaId != null ? tipoPessoaId : ''}&nome=${nome != null ? nome : ''}cpf=${cpf != null ? cpf : ''}&ativo=${ativo != null ? ativo : ''}`);
  }

  delete(id: number) {
    return this.http.delete<void>(`${API_URL}/api/bloqueiofrequentadores?workFlowId=${id}`);
  }

  edit(bloqueioFrequentadores: BloqueioFrequentadores) {
    return this.http.put<BloqueioFrequentadores>(`${API_URL}/api/bloqueiofrequentadores`, bloqueioFrequentadores);
  }

  insertbloqueioFrequentador(bloqueioFrequentadores: BloqueioFrequentadores) {
    return this.http.post<BloqueioFrequentadores>(`${API_URL}/api/bloqueiofrequentadores`, bloqueioFrequentadores);
  }
}
