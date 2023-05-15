import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-registro-salida',
  templateUrl: './registro-salida.component.html',
  styleUrls: ['./registro-salida.component.css'],
})
export class RegistroSalidaComponent {
  matricula: string;
  message: string;

  constructor(private _apiService: ApiService) {
    this.matricula = '';
    this.message = '';
  }

  onSubmitMatricula() {
    const url = `/registros-gimnasio/matricula`;

    this._apiService
      .put(url, { matricula: this.matricula.toUpperCase() })
      .subscribe((data) => {
        this.message = `Registro salida con éxito: ${data.matricula}`;
      });
  }
}
