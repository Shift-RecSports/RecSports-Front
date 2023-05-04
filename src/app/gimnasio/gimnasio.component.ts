import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../service/api.service';
import { Registro } from '../classes/gimnasio';
import { Subscription, switchMap, timer } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-gimnasio',
  templateUrl: './gimnasio.component.html',
  styleUrls: ['./gimnasio.component.css'],
})
export class GimnasioComponent {
  displayedColumns: string[] = ['matricula', 'nombre', 'entrada', 'salida'];
  listaRegistros: Registro[];
  dataSource = new MatTableDataSource<Registro>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  minDate: Date;
  maxDate: Date;
  date = new FormControl(new Date());
  url: string = '';

  daySelected: string;
  page: number;
  timerSubscription: Subscription;

  constructor(private _apiService: ApiService) {
    // Set the minimum to January 1st and maximun to June 31st
    // const currentYear = new Date().getFullYear();
    // TODO: Change maxDate to current day
    this.minDate = new Date(2023, 0, 1);
    this.maxDate = new Date(2023, 5, 31);
    this.daySelected = '';
    this.page = 0;
  }

  ngOnInit() {
    const today = new Date();
    this.changeDateSelected(today);
  }

  onFechaChange(type: string, event: MatDatepickerInputEvent<Date>) {
    this.timerSubscription.unsubscribe();
    this.changeDateSelected(this.date.value!);
  }

  changeDateSelected(day: Date = new Date()) {
    this.daySelected = `${day.getFullYear()}-${
      day.getMonth() + 1
    }-${day.getDay()}`;

    this.url = `/registros-gimnasio/fecha=${this.daySelected}&offset=${this.page}`;
    this.timerSubscription = timer(0, 10000)
      .pipe(switchMap(() => this._apiService.get(this.url)))
      .subscribe((data) => {
        console.log('reload');
        this.listaRegistros = data;
        this.dataSource.data = this.listaRegistros;
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
