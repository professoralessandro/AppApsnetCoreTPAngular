import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Container } from '../models/Container';
import { API_URL } from 'src/environments/API_URL';

@Injectable({
  providedIn: 'root'
})
export class ContainerService {

  constructor(private http: HttpClient) { }

  getAll(containerId?: number, blId?: number, numero?: number, tipo?: string) {
    debugger;
    var r = this.http.get<Container[]>(`${API_URL}/api/Container?containerId=${containerId != null ? containerId : ''}&blId=${blId != null ? blId : ''}&numero=${numero != null ? numero : ''}&tipo=${tipo != null ? tipo : ''}`);
    return r;
  }

  insert(Container: Container) {
    debugger;
    return this.http.post<Container>(`${API_URL}/api/Container`, Container);
  }

  delete(id: any) {
    debugger;
    return this.http.delete<void>(`${API_URL}/api/Container?ContainerId=${id}`);
  }

  edit(Container: Container) {
    debugger;
    return this.http.put<Container>(`${API_URL}/api/Container`, Container);
  }

}
