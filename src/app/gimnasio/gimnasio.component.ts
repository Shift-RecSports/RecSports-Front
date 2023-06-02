import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../service/api.service';
import { Registro } from '../classes/gimnasio';
import { Subscription, switchMap, timer } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ExcelServiceService } from '../service/excel-service.service';

@Component({
  selector: 'app-gimnasio',
  templateUrl: './gimnasio.component.html',
  styleUrls: ['./gimnasio.component.css'],
})
export class GimnasioComponent {
  displayedColumns: string[] = ['matricula', 'nombre', 'entrada', 'salida'];
  listaRegistros: Registro[] = [];
  dataSource = new MatTableDataSource<Registro>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  minDate: Date;
  maxDate: Date;
  date = new FormControl(new Date());
  url: string = '';

  daySelected: string;
  page: number;
  timerSubscription: Subscription;

  constructor(
    private _apiService: ApiService,
    private excelService: ExcelServiceService
  ) {
    // Set the minimum to January 1st and maximun to June 31st
    // const currentYear = new Date().getFullYear();
    // TODO: Change maxDate to current day
    this.minDate = new Date(2023, 0, 1);
    this.maxDate = new Date(2025, 5, 31);
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
    this.dataSource.data = [];

    this.daySelected = `${day.getFullYear()}-${
      day.getMonth() + 1
    }-${day.getDate()}`;

    this.url = `/registros-gimnasio/fecha=${this.daySelected}/offset=${this.page}`;
    this.timerSubscription = timer(0, 300000)
      .pipe(switchMap(() => this._apiService.get(this.url)))
      .subscribe((data) => {
        // MARK: this loop converts 09:00:00 into 09:00
        // console.log(data);
        // for (let i = 0; i < data.length; i++) {
        //   data[i].entrada = data[i].entrada.substring(
        //     0,
        //     data[i].entrada.lastIndexOf(':')
        //   );

        //   data[i].salida = data[i].salida.substring(
        //     0,
        //     data[i].salida.lastIndexOf(':')
        //   );
        // }

        this.listaRegistros = data;
        this.dataSource.data = this.listaRegistros;
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  exportExcel(data: any): void {
    const fileToExport = data.map((item: any) => {
      const fecha = new Date(item.fecha);
      fecha.setDate(fecha.getDate() + 1);
      return {
        Fecha: fecha,
        // Id: item.id,
        Matricula: item.matricula,
        Nombre: item.nombre,
        Entrada: item.entrada,
        Salida: item.salida,
      };
    });

    let conteos: {
      [key: string]: number;
    } = {};

    const conteo = data.map((item: Registro) => {
      if (item.fecha in conteos) {
        conteos[`${item.fecha}`] = conteos[item.fecha] + 1;
      } else {
        conteos[`${item.fecha}`] = 1;
      }
    });

    const fileToExportFreq = [];
    for (const [key, value] of Object.entries(conteos)) {
      fileToExportFreq.push({
        Fecha: key,
        Conteo: value,
      });
    }

    this.excelService.exportToExcel(
      fileToExport,
      fileToExportFreq,
      'RegistrosGimnasio-' + new Date().getTime() + '.xlsx'
    );
  }

  onClickCSV() {
    const url = `/registros-gimnasio`;
    this._apiService.get(url).subscribe((data) => {
      this.exportExcel(data);
    });
  }
}
