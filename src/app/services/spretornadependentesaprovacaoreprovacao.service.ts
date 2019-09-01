import { Injectable } from '@angular/core';
import { spRetornaDependentesAprovacaoReprovacao } from '../models/spRetornaDependentesAprovacaoReprovacao';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/environments/API_URL';
import { SedeImagens } from '../models/SedeImagens';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpRetornadependentesAprovacaoreprovacaoService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<spRetornaDependentesAprovacaoReprovacao[]>(`${environment.workflow_url}/api/spretornadependentesaprovacaoreprovacao`);
  }
}



