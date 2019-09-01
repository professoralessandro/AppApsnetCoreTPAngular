import { Injectable } from '@angular/core';
import { RepositorioMidias } from '../models/RepositorioMidias';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../environments/API_URL';
import { environment } from '../../../src/environments/environment';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { RepositorioMidiaMidias } from '../models/RepositorioMidiaMidias';

@Injectable({
  providedIn: 'root'
})
export class RepositorioMidiasService {

  constructor(private http: HttpClient) { }

  getAll(id?: number, titulo?: string, ativo?: boolean) {
    return this.http.get<RepositorioMidias[]>(
      `${API_URL}/api/RepositorioMidias?repositorioMidiaId=${id != null ? id : ''}&descricao=${titulo != null
        ? titulo : ''}&ativo=${ativo != null ? ativo : ''}`);
  }

  insert(mail: RepositorioMidias) {
    return this.http.post<RepositorioMidias>(`${API_URL}/api/RepositorioMidias`, mail);
  }

  delete(id: number) {

    return this.http.delete<void>(`${API_URL}/api/RepositorioMidias?repositorioMidiaId=${id}`);
  }

  edit(feed: RepositorioMidias) {
    return this.http.put<RepositorioMidias>(`${API_URL}/api/RepositorioMidias`, feed);
  }

  saveImage(id: number, formData: any) {
    return this.http.post<boolean>(`${API_URL}/api/RepositorioMidias/imagens?repositorioMidiaId=${id}`, formData);
  }

  findAllImage(id: number) {
    return this.http.get<RepositorioMidiaMidias[]>(`${API_URL}/api/RepositorioMidias/imagens?repositorioMidiaId=${id}`);
  }

  removeImage(id: number) {
    return this.http.delete(`${API_URL}/api/RepositorioMidias/imagens/deletar?id=${id}`);
  }
}
