import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';

export interface reservacion {
  id: string;
  dia: string;
  horario: string;
  zona: string;
  espacio: string;
  estatus: string;
  materiales: string;
}

export interface dataReservacion {
  id: string;
  estatus: number;
  fecha: string;
  hora_seleccionada: string;
  espacio: string;
  matricula_alumno: string;
}

const listaEstatus = ['Libre', 'Activa', 'Cancelada', 'Expirada'];

@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.component.html',
  styleUrls: ['./reservaciones.component.css'],
})
export class ReservacionesComponent {
  listaReservaciones: reservacion[] = [];
  matricula: string;

  constructor(private _apiService: ApiService, public dialog: MatDialog) {
    this.matricula = 'A01284184';
  }

  ngOnInit() {
    this.getListOfReservaciones();
  }

  getListOfReservaciones() {
    const url = `/reservaciones/matricula=${this.matricula}`;

    let auxListaReservaciones: reservacion[] = [];
    this._apiService.get(url).subscribe((data) => {
      data.forEach((dataReservacion: dataReservacion) => {
        const auxReservacion: reservacion = {
          id: dataReservacion.id,
          dia: `${dataReservacion.fecha.substring(8, 10)} ${this.getMonthName(
            parseInt(dataReservacion.fecha.substring(5, 7))
          )} ${dataReservacion.fecha.substring(0, 4)}`,
          horario: `${dataReservacion.hora_seleccionada.substring(0, 2)}:00 - ${
            parseInt(dataReservacion.hora_seleccionada.substring(0, 2)) + 1
          }:00`,
          zona: 'CBD1',
          espacio: dataReservacion.espacio,
          estatus: listaEstatus[dataReservacion.estatus - 1],
          materiales: 'Materiales',
        };

        auxListaReservaciones.push(auxReservacion);
      });

      this.listaReservaciones = auxListaReservaciones;
    });
  }

  getMonthName(monthNumber: number) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString('es-MX', { month: 'long' });
  }

  openDialog(selectedReservacion: reservacion): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { selectedReservacion: selectedReservacion },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getListOfReservaciones();
    });
  }
}
