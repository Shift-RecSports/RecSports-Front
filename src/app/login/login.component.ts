import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

import { userLogin } from '../service/types';

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

  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private router: Router
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
        matricula: this.loginform.value.matricula!,
        password: this.loginform.value.password!,
      };

      await this.service.Login(user);

      if (this.loginform.value.matricula == 'entrenador') {
        this.router.navigate(['/home-entrenador']);
      } else {
        this.router.navigate(['/home']);
      }

      // Add error handling
    }
  }

  onSubmit() {
    // this.submitted = true;
    // // stop here if form is invalid
    // if (this.registerForm.invalid) {
    //   return;
    // }
    // //True if all the fields are filled
    // if (this.submitted) {
    //   alert('Great!!');
    // }
  }
  ngOnInit() {
    // //Add User form validations
    // this.registerForm = this.formBuilder.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', [Validators.required]],
    // });
  }
}
