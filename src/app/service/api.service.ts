import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const apiURL = 'https://athletic-recsports.onrender.com';
@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  // GET
  get(endpoint: string, query = {}): Observable<any> {
    return this.httpClient.get(apiURL + '/api' + endpoint, query);
  }

  // GET image URL
  getImage(image: string = ''): string {
    return `${apiURL}/${image}`;
  }

  // POST
  post(endpoint: string, body: {}): Observable<any> {
    return this.httpClient.post(apiURL + '/api' + endpoint, body);
  }

  // POST with image
  postWithImage(endpoint: string, formData: FormData): Observable<any> {
    return this.httpClient.post(apiURL + '/api' + endpoint, formData);
  }

  // PUT
  put(endpoint: string, body: {}): Observable<any> {
    return this.httpClient.put(
      apiURL + '/api' + endpoint,
      JSON.stringify(body)
    );
  }

  // DELETE
  delete(endpoint: string): Observable<any> {
    return this.httpClient.delete(apiURL + '/api' + endpoint);
  }
}
