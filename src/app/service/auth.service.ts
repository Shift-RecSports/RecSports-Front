import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { userLogin, user } from './types';

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
    let userRole;

    switch (userLogin.matricula.toLowerCase()) {
      case 'entrenador': {
        userRole = 'entrenador';
        break;
      }
      case 'admin': {
        userRole = 'admin';
        break;
      }
      default: {
        userRole = 'alumno';
        break;
      }
    }

    const userData: user = {
      matricula: userLogin.matricula,
      userRole: userRole,
    };

    sessionStorage.setItem(
      'user',
      userData.matricula ? userData.matricula : ''
    );
    sessionStorage.setItem(
      'userrole',
      userData.userRole ? userData.userRole : ''
    );

    return userData;
  }

  isLoggedIn() {
    return sessionStorage.getItem('user') != null;
  }

  GetUserName() {
    return sessionStorage.getItem('user')?.toString();
  }

  GetUserRole() {
    return sessionStorage.getItem('userrole') != null
      ? sessionStorage.getItem('userrole')?.toString().toUpperCase()
      : 'd';
  }
}
