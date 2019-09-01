import { Injectable } from '@angular/core';
import { Feed } from '../models/Feed';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagemService {

  constructor(private http: HttpClient) { }

  getPathRead(chave: string, imagem: string) {
    return this.http.get<string[]>(`${environment.upload_service}/api/upload?pathRead=${chave}&image=${imagem}`);
  }

  getParameter(chave: string) {
    return this.http.get<string>(`${environment.upload_service}/api/upload/parametro?chave=${chave}`);
  }

  saveImage(chave: string, formData: any) {
    return this.http.post<string[]>(`${environment.upload_service}/api/upload?pathWrite=${chave}`, formData);
  }
}
