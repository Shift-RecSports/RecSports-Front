import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from './types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // TODO: Change API link for user
  // apiurl = 'https://api.namefake.com/';

  async Login(user: User): Promise<User> {
    // TODO: Uncomment
    // const response = await this.http.post(this.apiurl, user);

    // TOOD: Comment

    sessionStorage.setItem('user', user.matricula ? user.matricula : '');
    sessionStorage.setItem('role', user.userRole ? user.userRole : '');
    sessionStorage.setItem('nombre', user.nombre ? user.nombre : '');

    return user;
  }

  isLoggedIn() {
    return sessionStorage.getItem('user') != null;
  }

  GetUserName() {
    return sessionStorage.getItem('user')?.toString();
  }

  GetUserRole() {
    return sessionStorage.getItem('role') != null
      ? sessionStorage.getItem('role')?.toString().toUpperCase()
      : 'd';
  }

  GetUserNameString() {
    return sessionStorage.getItem('nombre')?.toString();
  }
}
