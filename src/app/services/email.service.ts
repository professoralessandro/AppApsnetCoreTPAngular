import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/environments/API_URL';
import { MailingMails } from '../models/MailingMails';
import { LoadedRouterConfig } from '@angular/router/src/config';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  getAll(
    MailingEmailId: number,
      Descricao: string,
      Assunto: string,
      ativo:boolean
      ) {


    return this.http.get<MailingMails[]>(`${API_URL}/api/mailingEmails?MailingEmailId=${MailingEmailId != null ? MailingEmailId : ''
                                      }&Assunto=${Assunto != null ? Assunto : ''
                                      }&Descricao=${Descricao != null ? Descricao : ''
                                      }&ativo=${ativo != null ? ativo : ''}`
                                  );

  }



  insert(mail: MailingMails) {
    return this.http.post<MailingMails>(`${API_URL}/api/mailingEmails`, mail);
  }

  delete(id: number) {

    return this.http.delete<void>(`${API_URL}/api/mailingEmails?mailId=${id}`);
  }

  edit(mail: MailingMails) {
    return this.http.put<MailingMails>(`${API_URL}/api/mailingEmails`, mail);
  }

}
