import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Deporte } from '../classes/deportes';

@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  //GET
  // get(url: string): Observable<any> {
  //   return this.httpClient.get('/api'+url);
  // }

  // GET
  get(url: string, query = {}): Observable<any> {
    return this.httpClient.get('/api' + url, query);
  }

  // POST
  post(url: string, body: {}): Observable<any> {
    return this.httpClient.get('/api' + url, body);
  }

  // UPDATE
  // DELETE
}
