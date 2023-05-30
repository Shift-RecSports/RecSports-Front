import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { AuthService } from '../service/auth.service';

export interface reservacion {
  id: string;
  dia: string;
  horario: string;
  zona: string;
  espacio: string;
  espacioId: string;
  estatus: string;
  materiales: string;
  imagen: string;
  deporte_nombre: string;
}

export interface dataReservacion {
  id: string;
  estatus: number;
  fecha: string;
  hora_seleccionada: string;
  espacio: string;
  espacio_nombre: string;
  matricula_alumno: string;
  imagen: string;
  materiales: string;
  deporte_nombre: string;
}

const listaEstatus = ['Libre', 'Activa', 'Expirada', 'Cancelada'];

@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.component.html',
  styleUrls: ['./reservaciones.component.css'],
})
export class ReservacionesComponent {
  listaDataReservaciones: dataReservacion[] = [];
  listaReservaciones: reservacion[] = [];
  matricula: string;

  constructor(
    private _apiService: ApiService,
    public dialog: MatDialog,
    private service: AuthService
  ) {
    this.matricula = '';
    if (this.service.isLoggedIn()) {
      this.matricula = this.service.GetUserName()
        ? this.service.GetUserName()!
        : '';
    }
  }

  ngOnInit() {
    this.getListOfReservaciones();
  }

  getListOfReservaciones() {
    const url = `/reservaciones/matricula/${this.matricula}`;

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
          espacio: dataReservacion.espacio_nombre,
          espacioId: dataReservacion.espacio,
          estatus: listaEstatus[dataReservacion.estatus - 1],
          materiales: dataReservacion.materiales,
          imagen: this._apiService.getImage(
            '/espacios',
            dataReservacion.imagen
          ),
          deporte_nombre: dataReservacion.deporte_nombre,
        };

        auxListaReservaciones.push(auxReservacion);
        this.listaDataReservaciones.push(dataReservacion);
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
    const dataReservacion = this.listaDataReservaciones.find(
      (reservacion) => reservacion.id == selectedReservacion.id
    );
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        selectedReservacion: selectedReservacion,
        dataReservacion: dataReservacion,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getListOfReservaciones();
    });
  }
}
