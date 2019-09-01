import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/environments/API_URL';
import { SedeEmails } from '../models/SedeEmails';

@Injectable({
  providedIn: 'root'
})
export class SedeEmailsService {

  constructor(private http: HttpClient) { }

  getAllBySedeId(sedeId: number) {
    return this.http.get<SedeEmails[]>(`${API_URL}/api/sedeemails?sedeId=${sedeId}`);
  }

  getSedeBySedeEmailId(sedeId: number) {
    return this.http.get<SedeEmails>(`${API_URL}/api/sedeemails?sedeEmailId=${sedeId}`);
  }

  insertSedeEmail(sedeEmail: SedeEmails) {
    return this.http.post<SedeEmails>(`${API_URL}/api/sedeemails`, sedeEmail);
  }

  updateSedeEmail(sedeEmail: SedeEmails) {
    return this.http.put<SedeEmails>(`${API_URL}/api/sedeemails`, sedeEmail);
  }
  
  deleteSedeEmail(sedeEmailId: number) {
    return this.http.delete(`${API_URL}/api/sedeemails?sedeEmailId=${sedeEmailId}`);
  }
}
