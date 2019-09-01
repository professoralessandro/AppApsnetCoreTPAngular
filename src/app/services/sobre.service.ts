import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../environments/API_URL';
import { Sobre } from '../models/Sobre';

@Injectable({
  providedIn: 'root'
})
export class SobreService {

  constructor(private http: HttpClient) { }

  getSobre() {
    return this.http.get<Sobre>(`${API_URL}/api/sobre`);
  }

  insert(mail: Sobre) {
    return this.http.post<Sobre>(`${API_URL}/api/sobre`, mail);
  }

  edit(feed: Sobre) {
    return this.http.put<Sobre>(`${API_URL}/api/sobre`, feed);
  }
}
