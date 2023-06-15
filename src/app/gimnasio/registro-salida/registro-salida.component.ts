import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-registro-salida',
  templateUrl: './registro-salida.component.html',
  styleUrls: ['./registro-salida.component.css'],
})
export class RegistroSalidaComponent {
  matricula: string; // Matricula introducida
  message: string; // Mensaje de notificacion
  loading = false; // Bandera para mostrar si esta cargando la peticion

  constructor(
    private _apiService: ApiService,
    private notification: NzNotificationService
  ) {
    this.matricula = '';
    this.message = '';
  }

  // Al iniciar la pagina, se selecciona por defecto el Input para registrar salida
  ngOnInit() {
    this.onScannerFocusInput();
  }

  // Funcion para crear una notificacion
  createNotification(type: string, title: string, description: string): void {
    this.notification.create(type, title, description);
  }

  // Al ejecutar el submit se registra la Salida correspondiente a la matricula
  onSubmitMatricula() {
    const url = `/registros-gimnasio/matricula`;
    this.loading = true; // Se muestra el icono de carga

    // Se realiza la peticion para registrar la salida correspondiente a la matricula
    this._apiService
      .put(url, { matricula: this.matricula.toUpperCase() })
      .subscribe(
        (data) => {
          // Notificacion de Exito
          const type = 'success';
          const title = `${this.matricula} - Registro de Salida exitoso`;
          const description = `El alumno ${this.matricula} ha registrado su salida con éxito`;

          this.createNotification(type, title, description);

          // Se reinicia la matricula
          this.loading = false;
          this.matricula = '';
        },
        (e) => {
          // Notificacion de peticion fallida
          const type = 'error';
          const title = `El alumno ${this.matricula} no se registró su salida éxito`;
          const description = e.error.message;

          this.createNotification(type, title, description);

          // Se reinicia la matricula
          this.loading = false;
          this.matricula = '';
        }
      );

    // Se pone el focus en Input del registro
    const input = document.getElementById('salida-box');
    input!.focus();
  }

  // Cuando se detecta que se escaneo un codigo, entonces automaticamente se inicia la peticion a la API para registrar la salida
  onScannerInput() {
    if (this.matricula.length === 9) {
      this.onSubmitMatricula();
    }
  }

  // Al iniciar la pagina, se selecciona por defecto el Input para registrar salida
  onScannerFocusInput() {
    const input = document.getElementById('salida-box');
    input!.focus();
  }
}
