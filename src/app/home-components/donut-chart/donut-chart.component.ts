import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { Aforo } from 'src/app/classes/aforos';
import { Subscription, switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css'],
})
export class DonutChartComponent implements OnInit {
  //aforo: Aforo = new Aforo(0, 1);

  aforo: number = 0; // Afoto
  total: number = 0; // Aforo total posible
  actual: number = 0; // Aforo actual
  percent: number = 0; // Porcetanke del aforo (Aforo actual / Aforo total)

  constructor(private _apiService: ApiService) {}

  timerSubscription: Subscription; // Subscripcion de tiempo para refrescar la pagina

  // Al iniciar la pagina, se ejecuta un GET para obtener la informacion del aforo desde la API
  ngOnInit(): void {
    const url = '/registros-gimnasio/aforo/actual';
    this.timerSubscription = timer(0, 900000)
      .pipe(switchMap(() => this._apiService.get(url)))
      .subscribe((data) => {
        console.log('reload de data concurrenciaGimnasio');
        this.percent = Math.round((data.actual / data.aforo) * 100);

        this.actual = data.actual;
        this.aforo = data.aforo;
      });
  }
}
