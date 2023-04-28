import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Deporte } from '../classes/deportes';


@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  //GET
  get(url: string): Observable<any> {
    return this.httpClient.get('/deportes');
  }


  // GET
  // get(url: string, query = {}): Observable<any> {
  //   return this.httpClient.get(url, { params: query });
  // }

  // POST
  post(url: string, body: {}): Observable<any> {
    return this.httpClient.get(url, body);
  }

  // UPDATE
  // DELETE
}
