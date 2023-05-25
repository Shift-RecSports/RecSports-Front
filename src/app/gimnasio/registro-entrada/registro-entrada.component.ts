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
    console.log(this.matricula);

    this._apiService
      .post(url, { matricula: this.matricula.toUpperCase() })
      .subscribe((data) => {
        this.message = `Matricula registrada con éxito: ${data.matricula}`;
      });
  }
}
