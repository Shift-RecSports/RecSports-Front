import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

import { User, userLogin } from '../service/types';
import { ApiService } from '../service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

const userRoles = ['admin', 'gimnasio', 'alumno'];

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  //Form variables
  registerForm: any = FormGroup;
  submitted = false;
  hide = true;

  showError = false;

  loading = false;

  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private router: Router,
    private _apiService: ApiService,
    private notification: NzNotificationService
  ) {
    sessionStorage.clear();
  }

  loginform = this.builder.group({
    matricula: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });

  async onLogin() {
    if (this.loginform.valid) {
      this.loading = true;

      const user: userLogin = {
        matricula: this.loginform.value.matricula!.toUpperCase(),
        password: this.loginform.value.password!,
      };

      const url = `/usuarios/login`;

      this._apiService
        .post(url, { matricula: user.matricula, contrasena: user.password })
        .subscribe(
          (data) => {
            if (data.matricula) {
              const type = 'success';
              const title = 'Inicio de Sesion exitoso';
              const description = `Usuario valido: ${data.matricula}`;
              this.createNotification(type, title, description);

              this.registerLogin({
                matricula: data.matricula,
                nombre: data.nombre,
                // userRole: userRoles[parseInt(data.tipo) - 1],
                // userRole: userRoles[1],
                userRole: data.tipo,
              });
            }
          },
          (e) => {
            const type = 'error';
            const title = 'Inicio de Sesion no exitoso';
            const description = e.error.message;
            this.createNotification(type, title, description);

            this.loading = false;
          }
        );
    }
  }

  async registerLogin(user: User) {
    const registeredUser = await this.service.Login(user);
    if (registeredUser.userRole == 'gimnasio') {
      this.router.navigate(['/home-entrenador']);
    } else {
      this.router.navigate(['']);
    }
  }

  createNotification(type: string, title: string, description: string): void {
    this.notification.create(type, title, description);
  }

  onSubmit() {}
  ngOnInit() {}
}
