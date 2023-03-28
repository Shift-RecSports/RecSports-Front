import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { userLogin, user } from './UserTypes';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // TODO: Change API link for user
  // apiurl = 'https://api.namefake.com/';

  async Login(userLogin: userLogin): Promise<user> {
    // TODO: Uncomment
    // const response = await this.http.post(this.apiurl, user);

    // TOOD: Comment
    const userRole =
      userLogin.matricula.toLowerCase() === 'alumno'
        ? 'alumno'
        : userLogin.matricula.toLowerCase() === 'admin'
        ? 'admin'
        : 'entrenador';
    //

    const userData: user = {
      matricula: userLogin.matricula,
      userRole: userRole,
    };

    sessionStorage.setItem('user', userData.matricula);
    sessionStorage.setItem('userrole', userData.userRole);

    return userData;
  }

  isLoggedIn() {
    return sessionStorage.getItem('user') != null;
  }

  GetUserName() {
    return sessionStorage.getItem('user')!;
  }

  GetUserRole() {
    return sessionStorage.getItem('userRole') != null
      ? sessionStorage.getItem('userRole')!.toString()
      : '';
  }
}
