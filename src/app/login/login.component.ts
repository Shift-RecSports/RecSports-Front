import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

import { User, userLogin } from '../service/types';
import { ApiService } from '../service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

// ROLES disponibles
const userRoles = ['admin', 'gimnasio', 'alumno'];

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  registerForm: any = FormGroup;
  submitted = false;
  hide = true;

  showError = false; // Bandera para activar una noticiacion de error
  loading = false; // Bandarea para saber si esta cargando la peticion

  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private router: Router,
    private _apiService: ApiService,
    private notification: NzNotificationService
  ) {
    sessionStorage.clear(); // Al iniciar, se reinicia el session storage
  }

  // FormBuilder para el Inicio de Sesion
  loginform = this.builder.group({
    matricula: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });

  // Funcion para ejecutar el inicio de sesion
  async onLogin() {
    if (this.loginform.valid) {
      this.loading = true; // Se muestra cargando la pagina

      // Objeto para almacenar las credenciales del usuario
      const user: userLogin = {
        matricula: this.loginform.value.matricula!.toUpperCase(),
        password: this.loginform.value.password!,
      };

      // Llamada a la API para validar las credenciales del usuario
      const url = `/usuarios/login`;
      this._apiService
        .post(url, { matricula: user.matricula, contrasena: user.password })
        .subscribe(
          (data) => {
            if (data.matricula) {
              // NOTIFICACION  de exito al iniciar sesion
              const type = 'success';
              const title = 'Inicio de Sesion exitoso';
              const description = `Usuario valido: ${data.matricula}`;
              this.createNotification(type, title, description);

              // Cuando es exitoso el inicio de sesion, se actualiza la informacion de usuario
              this.registerLogin({
                matricula: data.matricula,
                nombre: data.nombre,
                userRole: data.tipo,
              });
            }
          },
          (e) => {
            // NOTIFICACION de error
            const type = 'error';
            const title = 'Inicio de Sesion no exitoso';
            const description = e.error.message;
            this.createNotification(type, title, description);

            this.loading = false;
          }
        );
    }
  }

  // Se registran las credenciales del usuario para utilizarlas en la aplicacion
  async registerLogin(user: User) {
    const registeredUser = await this.service.Login(user);
    // En caso de que el rol del usuario sea GIMNASIO, entonces se redirige a su pagina de Inicio Gimnasio
    if (registeredUser.userRole == 'gimnasio') {
      this.router.navigate(['/home-entrenador']);

      // Si el rol del usuario es ADMIN o ALUMNO, se redirige a la pagina de Inicio
    } else {
      this.router.navigate(['']);
    }
  }

  // Funcion para ejecutar una notificacion
  createNotification(type: string, title: string, description: string): void {
    this.notification.create(type, title, description);
  }

  onSubmit() {}
  ngOnInit() {}
}
