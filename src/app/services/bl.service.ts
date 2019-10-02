import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bl } from '../models/Bl';
import { API_URL } from 'src/environments/API_URL';

@Injectable({
  providedIn: 'root'
})
export class BlService {

  constructor(private http: HttpClient) { }

  getAll(blId?: number, consignatario?: string) {
    return this.http.get<Bl[]>(`${API_URL}/api/bl?blId=${blId != null ? blId : ''}&consignatario=${consignatario != null ? consignatario : ''}`);
  }

  insert(bl: Bl) {
    return this.http.post<Bl>(`${API_URL}/api/bl`, bl);
  }

  delete(id: any) {
    return this.http.delete<void>(`${API_URL}/api/bl?blId=${id}`);
  }

  edit(bl: Bl) {
    return this.http.put<Bl>(`${API_URL}/api/bl`, bl);
  }
}
