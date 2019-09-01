import { Injectable } from '@angular/core';
import { WorkFlowFluxo } from '../models/WorkfFowFluxo';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/environments/API_URL';
import { environment } from 'src/environments/environment';
import { AssociadoPG } from '@app/models/Associado';
import { MotivosReprovacao } from '@app/models/MotivosReprovacao';
import { WorkFlow } from '@app/models/WorkfFlow';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  constructor(private http: HttpClient) { }

  getAll(workFlowId?: number,tipoAlcadaId?: number, registroId?: string, ativo?: boolean) {
    return this.http.get<WorkFlow[]>(`${environment.workflow_url}/api/workflow?workFlowId=${workFlowId != null ? workFlowId : ''}&tipoAlcadaId=${tipoAlcadaId != null ? tipoAlcadaId : ''}&registroId=${registroId != null ? registroId : ''}`);
  }

  getAllWithParameter(associadoId?: number, nome?: string, cpf?: string, email?: string, ativo?: boolean) {
    return this.http.get<AssociadoPG>(`${environment.beneficiarios_url}/api/associados?associadoId=${associadoId != null ? associadoId : ''}&nome=${nome != null ? nome : ''}&cpf=${cpf != null ? cpf : ''}&email=${email != null ? email : ''}&ativo=${ativo != null ? ativo : ''}`);
  }

  insert(workFlowFluxo: WorkFlowFluxo) {
    return this.http.post<WorkFlowFluxo>(`${environment.workflow_url}/api/workflowfluxo`, workFlowFluxo);
  }
}
