import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-registro-entrada',
  templateUrl: './registro-entrada.component.html',
  styleUrls: ['./registro-entrada.component.css'],
})
export class RegistroEntradaComponent {
  matricula: string;
  message: string;
  loading = false;

  constructor(
    private _apiService: ApiService,
    private notification: NzNotificationService
  ) {
    this.matricula = '';
    this.message = '';
  }

  createNotification(type: string, title: string, description: string): void {
    this.notification.create(type, title, description);
  }

  onSubmitMatricula() {
    const url = `/registros-gimnasio/matricula`;
    this.loading = true;

    this._apiService
      .post(url, { matricula: this.matricula.toUpperCase() })
      .subscribe(
        (data) => {
          const type = 'success';
          const title = 'Registro exitoso';
          const description = `El alumno ${this.matricula} ha sido registrado con éxito`;

          this.createNotification(type, title, description);
          this.loading = false;
        },
        (e) => {
          const type = 'error';
          const title = 'No se registro con éxito';
          const description = e.error.message;

          this.createNotification(type, title, description);
          this.loading = false;
        }
      );

    const input = document.getElementById('entrada-box');
    input!.focus();

    this.matricula = '';
  }
}
