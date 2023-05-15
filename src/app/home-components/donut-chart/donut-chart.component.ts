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
  aforo: Aforo = new Aforo(0, 1);

  total: number = 0;
  actual: number = 0;
  percent: number = 0;

  constructor(private _apiService: ApiService) {}

  timerSubscription: Subscription;

  ngOnInit(): void {
    const url = '/aforo-actual';

    this.timerSubscription = timer(0, 10000)
      .pipe(switchMap(() => this._apiService.get(url)))
      .subscribe((data) => {
        console.log('reload de data concurrenciaGimnasio');
        this.percent = Math.round((data.actual / data.aforo) * 100);

        this.actual = data.actual;
        this.aforo = data.aforo;
      });

    /*

    this._apiService.get(url).subscribe((data) => {
      this.aforo = new Aforo(data.actual, data.aforo);
      this.percent = Math.round(data.actual / data.aforo)
      this.actual = data.actual;
      this.aforo = data.aforo;

      console.log(data);
    });

    */
  }
}
