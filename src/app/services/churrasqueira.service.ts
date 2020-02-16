import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Churrasqueiras } from '../models/Churrasqueiras';
import { API_URL } from 'src/environments/API_URL';

@Injectable({
  providedIn: 'root'
})
export class ChurrasqueiraService {

  constructor(private http: HttpClient) { }

  getAll(id?: number, titulo?: string, ativo?: boolean) {
    return this.http.get<Churrasqueiras[]>(`${API_URL}/api/feed?feedId=${id != null ? id : ''}&titulo=${titulo != null ?
      titulo : ''}&ativo=${ativo != null ? ativo : ''}`);
  }

  insert(mail: Churrasqueiras) {
    return this.http.post<Churrasqueiras>(`${API_URL}/api/feed`, mail);
  }

  delete(id: number) {

    return this.http.delete<void>(`${API_URL}/api/feed?feedId=${id}`);
  }

  edit(feed: Churrasqueiras) {
    return this.http.put<Churrasqueiras>(`${API_URL}/api/feed`, feed);
  }
}
