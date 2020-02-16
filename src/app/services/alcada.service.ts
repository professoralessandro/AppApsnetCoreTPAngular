import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alcadas } from '../models/Alcada';
import { API_URL } from 'src/environments/API_URL';

@Injectable({
  providedIn: 'root'
})
export class AlcadaService {

  constructor(private http: HttpClient) { }

  getAll(alcadaId?: number, sedeId?: any, descricao?: string, ativo?: any) {
    var r = this.http.get<Alcadas[]>(`${API_URL}/api/alcadas?alcadaId=${alcadaId != null ? alcadaId : ''}&descricao=${descricao}&ativo=${ativo}`);
    return r;
  }

  insert(alcadas: Alcadas) {
    return this.http.post<Alcadas>(`${API_URL}/api/alcadas`, Alcadas);
  }

  delete(id: any) {
    return this.http.delete<void>(`${API_URL}/api/alcadas?alcadaId=${id}`);
  }

  edit(alcadas: Alcadas) {
    return this.http.put<Alcadas>(`${API_URL}/api/alcadas`, alcadas);
  }

}
