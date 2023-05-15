import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-registro-entrada',
  templateUrl: './registro-entrada.component.html',
  styleUrls: ['./registro-entrada.component.css'],
})
export class RegistroEntradaComponent {
  matricula: string;
  message: string;

  constructor(private _apiService: ApiService) {
    this.matricula = '';
    this.message = '';
  }

  onSubmitMatricula() {
    const url = `/registros-gimnasio/matricula`;

    this._apiService
      .post(url, { matricula: this.matricula.toUpperCase() })
      .subscribe((data) => {
        this.message = `Matricula registrada con éxito: ${data.matricula}`;
      });
  }
}
