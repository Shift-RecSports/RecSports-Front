import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from './types';

// Servicio de autenticacion y AuthGuard
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // Se almancenan las credenciales del usuario en sessionStorage
  async Login(user: User): Promise<User> {
    sessionStorage.setItem('user', user.matricula ? user.matricula : '');
    sessionStorage.setItem('role', user.userRole ? user.userRole : '');
    sessionStorage.setItem('nombre', user.nombre ? user.nombre : '');

    return user;
  }

  // Valida si el usuario ha iniciado sesion
  isLoggedIn() {
    return sessionStorage.getItem('user') != null;
  }

  // Retorna el identificacdor/Matricula del usuario
  GetUserName() {
    return sessionStorage.getItem('user')?.toString();
  }

  // Retorna el tipo de usuario
  GetUserRole() {
    return sessionStorage.getItem('role') != null
      ? sessionStorage.getItem('role')?.toString().toUpperCase()
      : 'd';
  }

  // Retorna el nombre del usuario
  GetUserNameString() {
    return sessionStorage.getItem('nombre')?.toString();
  }
}
