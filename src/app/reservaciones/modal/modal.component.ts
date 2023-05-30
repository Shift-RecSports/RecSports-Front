import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

interface dataReservacion {
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
    private notification: NzNotificationService,
    @Inject(MAT_DIALOG_DATA) public data: dataReservacion
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  // Converts string "14 mayo 2023" into "2023-05-14"
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

  stringToHour(hour: string) {
    const hourString = `${
      parseInt(hour.substring(0, hour.indexOf(':'))) < 10
        ? `0${hour.substring(0, hour.indexOf(':') + 3)}:00`
        : `${hour.substring(0, hour.indexOf(':') + 3)}:00`
    }`;
    return hourString;
  }

  onConfirmClick() {
    const url = `/reservaciones/${this.data.dataReservacion.id}`;

    this._apiService.delete(url).subscribe(
      (data) => {
        const type = 'success';
        const title = `Se cancelo la reservacion con exito`;
        const description = `Se ha cancelado con exito`;

        this.createNotification(type, title, description);
        this.onNoClick();
      },
      (e) => {
        const type = 'error';
        const title = `No se ha logrado canelcar la reservacion`;
        const description = e.error.message;

        this.createNotification(type, title, description);
        this.onNoClick();
      }
    );
  }

  createNotification(type: string, title: string, description: string): void {
    this.notification.create(type, title, description);
  }
}
