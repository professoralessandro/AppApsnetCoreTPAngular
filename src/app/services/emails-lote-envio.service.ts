import { Injectable } from '@angular/core';
import { API_URL } from 'src/environments/API_URL';
import { HttpClient } from '@angular/common/http';
import { MailingLoteEnvios } from '../models/MailingLoteEnvios';
import { MailingMails } from '../models/MailingMails';
import { Usuarios } from '../models/Usuarios';
import { MailingLoteEnvioDestinatarios } from '../models/MailingLoteEnvioDestinatarios';

@Injectable({
  providedIn: 'root'
})
export class EmailsLoteEnvioService {

  constructor(private http: HttpClient) { }

  getAll(mailingLoteEnvioId?: number, nomeLote?: string, dataEnvioInicio?: Date, dataEnvioFim?: Date, statusId?: number, ativo?: boolean) {
    return this.http.get<MailingLoteEnvios[]>(`${API_URL}/api/mailingloteenvios?mailingLoteEnvioId=${mailingLoteEnvioId != null ? mailingLoteEnvioId : ''}&nomeLote=${nomeLote != null ? nomeLote : ''}&dataEnvioInicio=${dataEnvioInicio != null ? dataEnvioInicio : ''}&dataEnvioFim=${dataEnvioFim != null ? dataEnvioFim : ''}&statusId=${statusId != 0 ? statusId : ''}&ativo=${ativo != null ? ativo : ''}`);
  }

  getMensagens() {
    return this.http.get<MailingMails[]>(`${API_URL}/api/mailingemails/`);
  }

  insert(mailingLoteEnvios: MailingLoteEnvios) {
    return this.http.post<MailingLoteEnvios>(`${API_URL}/api/mailingLoteEnvios`, mailingLoteEnvios);
  }

  delete(id: any) {
    return this.http.delete<void>(`${API_URL}/api/mailingloteenvios?mailingLoteEnviosId=${id}`);
  }

  edit(mailingLoteEnvios: MailingLoteEnvios) {
    return this.http.put<MailingLoteEnvios>(`${API_URL}/api/mailingLoteEnvios`, mailingLoteEnvios);
  }

  getUsuarioById(id: number) {
    return this.http.get<Usuarios>(`${API_URL}/api/MailingLoteEnvios/usuario?idUsuario=${id}`).toPromise();
  }

  sendEmails(idLote: number) {
    return this.http.post<MailingLoteEnvios>(`${API_URL}/api/mailingloteenvios/enviar?idLote=${idLote}`, idLote);
  }

  getAllDestinatarios(idLote: number) {
    return this.http.get<MailingLoteEnvioDestinatarios[]>(`${API_URL}/api/mailingloteenvios/destinatarios?mailingloteenvioid=${idLote}`).toPromise();
  }

  insertDestinatario(mailingLoteEnvios: MailingLoteEnvioDestinatarios) {
    return this.http.post<MailingLoteEnvioDestinatarios>(`${API_URL}/api/mailingloteenvios/destinatario`, mailingLoteEnvios);
  }

  deleteDesti(id: number) {
    return this.http.delete(`${API_URL}/api/mailingloteenvios/destinatario?MailingLoteEnvioDestinatarioId=${id}`);
  }
}
