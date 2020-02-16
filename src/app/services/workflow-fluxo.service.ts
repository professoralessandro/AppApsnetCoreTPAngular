import { Injectable } from '@angular/core';
import { WorkFlowFluxo } from '../models/WorkfFowFluxo';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/environments/API_URL';
import { environment } from 'src/environments/environment';
import { AssociadoPG } from '@app/models/Associado';
import { MotivosReprovacao } from '@app/models/MotivosReprovacao';

@Injectable({
  providedIn: 'root'
})
export class WorkflowFluxoService {

  constructor(private http: HttpClient) { }

  getAll(workFlowFluxoId?: number, workFlowId?: number, ativo?: boolean) {
    return this.http.get<WorkFlowFluxo[]>(`${environment.workflow_url}/api/workflowfluxo?workFlowFluxoId=${workFlowFluxoId != null ? workFlowFluxoId : ''}&workFlowId=${workFlowId != null ? workFlowId : ''}&ativo=${ativo != null ? ativo : ''}`);
  }

  getAllWithParameter(associadoId?: number, nome?: string, cpf?: string, email?: string, ativo?: boolean) {
    return this.http.get<AssociadoPG>(`${environment.beneficiarios_url}/api/associados?associadoId=${associadoId != null ? associadoId : ''}&nome=${nome != null ? nome : ''}&cpf=${cpf != null ? cpf : ''}&email=${email != null ? email : ''}&ativo=${ativo != null ? ativo : ''}`);
  }

  insert(workFlowFluxo: WorkFlowFluxo) {
    return this.http.post<WorkFlowFluxo>(`${environment.workflow_url}/api/workflowfluxo`, workFlowFluxo);
  }

  delete(id: number) {
    return this.http.delete<void>(`${environment.workflow_url}/api/workflowfluxo?workFlowId=${id}`);
  }

  edit(workFlowFluxo: WorkFlowFluxo) {
    debugger;
    return this.http.put<WorkFlowFluxo>(`${environment.workflow_url}/api/workflowfluxo`, workFlowFluxo);
  }

  insertMotivoReprovacao(motivosReprovacao: MotivosReprovacao) {
    debugger;
    return this.http.post<MotivosReprovacao>(`${environment.workflow_url}/api/motivosreprovacao`, motivosReprovacao);
  }
}
