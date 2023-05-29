import { Component, OnInit } from '@angular/core';
import { RespuestaEncuesta } from 'src/app/classes/respuesta-encuesta';
import { ApiService } from 'src/app/service/api.service';

interface Promedios {
  promedio1: number;
  promedio2: number;
  promedio3: number;
}

@Component({
  selector: 'app-encuestas-admin',
  templateUrl: './encuestas-admin.component.html',
  styleUrls: ['./encuestas-admin.component.css']
})
export class EncuestasAdminComponent implements OnInit {
  respuestasEncuesta: RespuestaEncuesta[] = [];
  promediosEncuesta: Promedios = {
    promedio1: 0,
    promedio2: 0,
    promedio3: 0
  };
  //arreglo para numeros abajo de slider
  tickValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  //valor de promedio de slider hardcodeado
  value = 8

  constructor(private _apiService: ApiService){}

  ngOnInit() {
    const url1 = '/encuestas/promedios';
    this._apiService.get(url1).subscribe((data1) => {
      this.promediosEncuesta = data1;
      const url2 = '/encuestas';
      this._apiService.get(url2).subscribe((data2) => {
        this.respuestasEncuesta = data2;
      });
    });
  }
}
