import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  // GET
  get(url: string, query = {}): Observable<any> {
    return this.httpClient.get('/api' + url, query);
  }

  // POST
  post(url: string, body: {}): Observable<any> {
    return this.httpClient.post('/api' + url, JSON.stringify(body));
  }

  // PUT
  put(url: string, body: {}): Observable<any> {
    return this.httpClient.put('/api' + url, JSON.stringify(body));
  }

  // DELETE
  delete(url: string): Observable<any> {
    return this.httpClient.delete('/api' + url);
  }
}
