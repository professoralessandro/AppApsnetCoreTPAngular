import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quiosques } from '../models/Quiosques';
import { API_URL } from 'src/environments/API_URL';

@Injectable({
  providedIn: 'root'
})
export class QuiosqueUnidadeService {
  // Int32? quiosqueId,
  // Int64? sedeId,
  // int? numeroQuiosque,
  // bool? ativo)
  
  constructor(private http: HttpClient) { }

  getAll(quiosqueId?: number, sedeId?: number, numeroQuiosque?: number, ativo?: boolean) {
// tslint:disable-next-line: max-line-length
    return this.http.get<Quiosques[]>(`${API_URL}/api/quiosques?quiosqueId=${quiosqueId != null ? quiosqueId : ''}&sedeId=${sedeId != 0 ? sedeId : ''}&numeroQuiosque=${numeroQuiosque != null ? numeroQuiosque : ''}&ativo=${ativo != null ? ativo : ''}`);
  }

  insert(mail: Quiosques) {
    return this.http.post<Quiosques>(`${API_URL}/api/quiosques`, mail).toPromise();
  }

  delete(id: number) {

    return this.http.delete<void>(`${API_URL}/api/quiosques?quiosqueId=${id}`);
  }

  edit(feed: Quiosques) {
    return this.http.put<Quiosques>(`${API_URL}/api/quiosques`, feed);
  }
}

