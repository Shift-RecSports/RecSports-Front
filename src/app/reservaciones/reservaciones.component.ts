import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { AuthService } from '../service/auth.service';

// Interfaz de la reservacion utilizada en frontend
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

// Interfaz de la respuesta de la API a la peticion de las reservaciuones
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

// Lista de diferentes estatus posibles
const listaEstatus = ['Libre', 'Activa', 'Expirada', 'Cancelada'];

@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.component.html',
  styleUrls: ['./reservaciones.component.css'],
})
export class ReservacionesComponent {
  listaDataReservaciones: dataReservacion[] = []; // Respuesta de la API de reservaciones propias del usuario
  listaReservaciones: reservacion[] = []; // Reservas utilizadas para despliegue en el front
  matricula: string; // Identificador del usuario

  constructor(
    private _apiService: ApiService,
    public dialog: MatDialog,
    private service: AuthService
  ) {
    // Se obitnenen los datos del usuario que ha inciciado sesion
    this.matricula = '';
    if (this.service.isLoggedIn()) {
      this.matricula = this.service.GetUserName()
        ? this.service.GetUserName()!
        : '';
    }
  }

  // Al inicial el componnte se manda la peticion para obtener la lsita de reservacviones
  ngOnInit() {
    this.getListOfReservaciones();
  }

  // Obtiene la lista de reservaciones
  getListOfReservaciones() {
    const url = `/reservaciones/matricula/${this.matricula}`; // URL

    // Lista de reservaciones. Se obtiene de la API y se transforman al formato a desplegar en la pagina de reservaciones
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

  // Funcion para transformar el mes en formato numerico a un string local en español
  getMonthName(monthNumber: number) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString('es-MX', { month: 'long' });
  }

  // Abre el modal y pasa la referencia de la reservacion seleccionada
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
