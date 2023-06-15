import { Component, OnInit } from '@angular/core';
import { User, navbarFlags } from '../service/types';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import * as JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-credencial',
  templateUrl: './credencial.component.html',
  styleUrls: ['./credencial.component.css'],
})
export class CredencialComponent implements OnInit {
  user: User; // Informacion del Usuario

  // Al iniciar la pagina de la Credencial se obtienen los detalles del Usuario
  ngOnInit(): void {
    if (this.service.isLoggedIn()) {
      this.user = {
        matricula: this.service.GetUserName() ? this.service.GetUserName() : '',
        userRole: this.service.GetUserRole(),
        nombre: this.service.GetUserNameString(),
      };
    }

    // Si el usuario cuenta con una matricula valida, se genera el codigo de abrras
    if (this.user.matricula != null) {
      JsBarcode('#barcode', this.user.matricula, { width: 3 });
    }
  }

  constructor(private service: AuthService, private router: Router) {
    this.user = { matricula: '', nombre: '', userRole: '' };
  }
}
