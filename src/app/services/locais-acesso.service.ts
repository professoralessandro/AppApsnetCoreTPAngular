import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/environments/API_URL';
import { LocaisAcesso } from '../models/LocaisAcesso';
import { Exames } from '../models/Exames';
import { LocaisAcessoTaxas } from '../models/LocaisAcessoTaxas';
import { LocaisAcessoExames } from '../models/LocaisAcessoExames';


@Injectable({
  providedIn: 'root'
})
export class LocaisAcessoService {

  constructor(private http: HttpClient) { }

  getAll(localAcessoId?: number, sedeId?: number, descricao?: string, ativo?: boolean) {
    return this.http.get<LocaisAcesso[]>(`${API_URL}/api/localacesso?localAcessoId=${localAcessoId != null ? localAcessoId : ''}&sedeId=${sedeId != null ? sedeId : ''}&descricao=${descricao}&ativo=${ativo}`);
  }

  insert(locaisAcesso: LocaisAcesso) {
    debugger;
    return this.http.post<LocaisAcesso>(`${API_URL}/api/localacesso`, locaisAcesso);
  }

  delete(id: any) {
    return this.http.delete<void>(`${API_URL}/api/localacesso?localAcessoId=${id}`);
  }

  edit(locaisAcesso: LocaisAcesso) {
    debugger;
    return this.http.put<LocaisAcesso>(`${API_URL}/api/localacesso`, locaisAcesso);
  }

  getLocaisExames(localAcessoId: number) {
    return this.http.get<LocaisAcessoExames[]>(`${API_URL}/api/locaisacessoexames?localAcessoId=${localAcessoId}`);
  }

  getLocaisTaxas(localAcessoId: number) {
    return this.http.get<LocaisAcessoTaxas[]>(`${API_URL}/api/locaisacessotaxas?localAcessoId=${localAcessoId}`);
  }

  getAllExames() {
    return this.http.get<Exames[]>(`${API_URL}/api/exames`);
  } 



  deleteLocaisAcessoExames(localAcessoId: number) {
    return this.http.delete<void>(`${API_URL}/api/locaisacessoexames?localAcessoId=${localAcessoId}`);
  }

  insertLocaisAcessoExames(locaisAcessoExames: LocaisAcessoExames) {
    return this.http.post<Exames>(`${API_URL}/api/locaisacessoexames`, locaisAcessoExames);
  }


  deleteLocaisAcessoTaxas(localAcessoId: number) {
    return this.http.delete<void>(`${API_URL}/api/locaisacessotaxas?localAcessoId=${localAcessoId}`);
  }

  insertLocaisAcessoTaxas(taxa: LocaisAcessoTaxas) {
    return this.http.post<LocaisAcesso>(`${API_URL}/api/locaisacessotaxas`, taxa);
  }
}
