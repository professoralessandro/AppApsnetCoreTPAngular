import { Injectable } from '@angular/core';
import { Feed } from '../models/Feed';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/environments/API_URL';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient) { }

  getAll(id?: number, titulo?: string, ativo?: boolean) {
    return this.http.get<Feed[]>(`${API_URL}/api/feed?feedId=${id != null ? id : ''}&titulo=${titulo != null ?
      titulo : ''}&ativo=${ativo != null ? ativo : ''}`);
  }

  insert(mail: Feed) {
    console.log(mail);
    //alert(1);
    return this.http.post<Feed>(`${API_URL}/api/feed`, mail);
  }

  delete(id: number) {

    return this.http.delete<void>(`${API_URL}/api/feed?feedId=${id}`);
  }

  edit(feed: Feed) {
    return this.http.put<Feed>(`${API_URL}/api/feed`, feed);
  }
}
