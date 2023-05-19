import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

import { User, userLogin } from '../service/types';
import { ApiService } from '../service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

const userRoles = ['admin', 'entrenador', 'alumno'];

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
      const user: userLogin = {
        matricula: this.loginform.value.matricula!.toUpperCase(),
        password: this.loginform.value.password!.toUpperCase(),
      };
      
      const url = `/acceso`;

      // this._apiService
      //   .post(url, { matricula: user.matricula, contrasena: user.password })
      //   .subscribe((data) => {
      //     if (data.length > 0) {
      //       const url2 = `/usuario/${data[0].matricula}`;
      //       this._apiService.get(url2).subscribe((data) => {
      //         this.registerLogin({
      //           matricula: data.matricula,
      //           nombre: data.nombre,
      //           userRole: userRoles[parseInt(data.tipo) - 1],
      //         });
      //       });
      //     } else {
      //       this.createBasicNotification();
      //     }
      //   });

      if (user.matricula == 'ADMIN') {
        this.registerLogin({
          matricula: user.matricula,
          nombre: '',
          userRole: userRoles[0],
        });
      } else if (user.matricula == 'GIMNASIO') {
        this.registerLogin({
          matricula: user.matricula,
          nombre: '',
          userRole: userRoles[1],
        });
      } else {
        this.registerLogin({
          matricula: user.matricula,
          nombre: '',
          userRole: userRoles[2],
        });
      }
    }
  }

  // onOpenAlert() {
  //   this.showError = true;
  // }

  // onCloseAlert() {
  //   this.showError = false;
  // }

  createBasicNotification(): void {
    this.notification
      .blank(
        'Credenciales inválidas',
        'La contraseña o usuario no son correctas, intente otra vez'
      )
      .onClick.subscribe(() => {
        console.log('notification clicked!');
      });
  }

  async registerLogin(user: User) {
    const registeredUser = await this.service.Login(user);
    if (registeredUser.userRole == 'entrenador') {
      this.router.navigate(['/home-entrenador']);
    } else {
      this.router.navigate(['']);
    }
  }

  onSubmit() {}
  ngOnInit() {}
}
