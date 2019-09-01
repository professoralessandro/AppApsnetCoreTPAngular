import { Injectable } from '@angular/core';
// import { Associados } from '../models/Associados';
import { BaseResult } from '../_helpers/BaseResult';

import { Associado, AssociadoPG } from '../models/Associado';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AssociadoBloqueio } from '@app/models/AssociadoBloqueio';
import { API_URL } from 'src/environments/API_URL';



@Injectable({
  providedIn: 'root'
})
export class AssociadoService {

  constructor(private http: HttpClient
  ) { }

  getId(id: any) {
    return this.http.get<Associado>(`${API_URL}/api/associados/${id}`);
  }

  getAll(funcional?: string, nome?: string, ativo?: any, cpf?: string, page: number = 1) {
    return this.http.get<AssociadoPG>(`${API_URL}/api/associados?size=10&page=${page}&nome=${nome != null ? nome : ''}&funcional=${funcional != null ? funcional : ''}&cpf=${cpf != null ? cpf : ''}&ativo=${ativo}`);
  }

  insert(associados: Associado) {
    return this.http.post<Associado>(`${API_URL}/api/associados/`, associados);
  }

  insertBloqueio(associadoBloqueio: AssociadoBloqueio) {
    return this.http.post<Associado>(`${API_URL}/api/associadosbloqueio/`, associadoBloqueio);
  }

  delete(id: any) {
    return this.http.delete<void>(`${API_URL}/api/associados/${id}`);
  }

  edit(associados: Associado) {
    return this.http.put<Associado>(`${API_URL}/api/associados/${associados.associadoId}`, associados);
  }

  getById(associadoId: number) {
    return this.http.get<Associado>(`${API_URL}/api/associados/${associadoId}`);
  }

  gerarExcel(data): Observable<Blob> {
    let url = `${API_URL}/api/associados/excelassociados`;
    return this.http.post<Blob>(url, data,
      { responseType: 'blob' as 'json' });
  }

  getAllByName(nome: string, page: number, size: number) {
    return this.http.get<BaseResult<Associado>>(`${API_URL}/api/associados?nome=${nome}&page=${page}&size=${size}`);
  }

  getAllWithParameter(associadoId?: number, nome?: string, cpf?: string, email?: string, ativo?: boolean, tipoPessoa?: string) {
    return this.http.get<Associado[]>(`${environment.workflow_url}/api/associados?associadoId=${associadoId != null ? associadoId : ''}&nome=${nome != null ? nome : ''}&cpf=${cpf != null ? cpf : ''}&email=${email != null ? email : ''}&ativo=${ativo != null ? ativo : ''}&bloqueado=&associadoIdPai=&tipoPessoa=${tipoPessoa != null ? tipoPessoa : ''}`);
  }

  getAllWorkflow(funcional?: string, nome?: string, ativo?: any, cpf?: string, page: number = 1) {
    return this.http.get<AssociadoPG>(`${environment.workflow_url}/api/associados?size=10&page=${page}&nome=${nome != null ? nome : ''}&funcional=${funcional != null ? funcional : ''}&cpf=${cpf != null ? cpf : ''}&ativo=${ativo}`);
  }
}
