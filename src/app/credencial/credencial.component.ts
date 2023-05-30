import { Component, OnInit } from '@angular/core';
import { User, navbarFlags } from '../service/types';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import * as JsBarcode from 'jsbarcode';



@Component({
  selector: 'app-credencial',
  templateUrl: './credencial.component.html',
  styleUrls: ['./credencial.component.css']
})
export class CredencialComponent implements OnInit {
  user: User;
  ngOnInit(): void {
    if (this.service.isLoggedIn()) {
      this.user = {
        matricula: this.service.GetUserName() ? this.service.GetUserName() : '',
        userRole: this.service.GetUserRole(),
        nombre: this.service.GetUserNameString(),
      };
     
    }
    if(this.user.matricula != null ){
      JsBarcode("#barcode",  this.user.matricula ,{ width: 3,});
    }
   
  }

  constructor(
    private service: AuthService,
    private router: Router
  ) {
    this.user = { matricula: '', nombre: '', userRole: '' };
  }

}
