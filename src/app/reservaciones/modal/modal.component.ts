import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

// Interfaz para la reservacion que se muestra y el homologo de la reservacion que se manda a la API
interface dataReservacion {
  // Reservacion Seleccionada
  selectedReservacion: {
    id: string;
    dia: string;
    horario: string;
    zona: string;
    espacio: string;
    espacioId: string;
    estatus: string;
    materiales: string;
  };
  // Data de la reservacion de la API
  dataReservacion: {
    id: string;
    estatus: number;
    fecha: string;
    hora_seleccionada: string;
    espacio: string;
    espacio_nombre: string;
    matricula_alumno: string;
    imagen: string;
    materiales: string;
  };
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  constructor(
    private _apiService: ApiService,
    public dialogRef: MatDialogRef<ModalComponent>,
    private notification: NzNotificationService, // Para mostrar una notificacion
    @Inject(MAT_DIALOG_DATA) public data: dataReservacion
  ) {}

  // Al presional afuera del modal o en la "X" cierra el modal
  onNoClick(): void {
    this.dialogRef.close();
  }

  // Covierte el string "14 mayo 2023" en "2023-05-14"
  stringToDate(day: string) {
    const dayNumber = parseInt(day.substring(0, day.indexOf(' ')));
    const dayYear = day.substring(day.lastIndexOf(' ') + 1, day.length);

    const auxDate = new Date().getFullYear();
    const dayMonth =
      new Date(
        `${day.substring(
          day.indexOf(' ') + 1,
          day.lastIndexOf(' ')
        )} 1, ${auxDate}`
      ).getMonth() + 1;

    const DateString = `${dayYear}-${
      dayMonth + 1 < 10 ? `0${dayMonth}` : dayMonth
    }-${dayNumber < 10 ? `0${dayNumber}` : dayNumber}`;

    return DateString;
  }

  // Contierte el string de la reservacion al tipo Dato
  stringToHour(hour: string) {
    const hourString = `${
      parseInt(hour.substring(0, hour.indexOf(':'))) < 10
        ? `0${hour.substring(0, hour.indexOf(':') + 3)}:00`
        : `${hour.substring(0, hour.indexOf(':') + 3)}:00`
    }`;
    return hourString;
  }

  // Al confirmar se cancela la reservacion y se llama al endpoint de la API para cancelar la reservacion
  onConfirmClick() {
    const url = `/reservaciones/${this.data.dataReservacion.id}`;

    // Se borra la reservacion por el ID
    this._apiService.delete(url).subscribe(
      (data) => {
        const type = 'success';
        const title = `Se canceló la reservación con éxito`;
        const description = `Se ha cancelado con éxito`;

        // Notificacion de exito
        this.createNotification(type, title, description);
        this.onNoClick();
      },
      (e) => {
        const type = 'error';
        const title = `No se ha logrado cancelar la reservación`;
        const description = e.error.message;

        // Notificacion de error
        this.createNotification(type, title, description);
        this.onNoClick();
      }
    );
  }

  // Funcion para crear una notificacion
  createNotification(type: string, title: string, description: string): void {
    this.notification.create(type, title, description);
  }
}
