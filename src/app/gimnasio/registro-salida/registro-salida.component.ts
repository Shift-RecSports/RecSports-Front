import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-registro-salida',
  templateUrl: './registro-salida.component.html',
  styleUrls: ['./registro-salida.component.css'],
})
export class RegistroSalidaComponent {
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
      .put(url, { matricula: this.matricula.toUpperCase() })
      .subscribe(
        (data) => {
          const type = 'success';
          const title = 'Registro de Salida exitoso';
          const description = `El alumno ${this.matricula} ha registrado su salida con éxito`;

          this.createNotification(type, title, description);
          this.loading = false;
        },
        (e) => {
          const type = 'error';
          const title = 'Registro de Salida no exitoso';
          const description = e.error.message;

          this.createNotification(type, title, description);
          this.loading = false;
        }
      );

    this.matricula = '';
  }
}
