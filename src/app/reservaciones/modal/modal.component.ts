import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api.service';

interface dataReservacion {
  selectedReservacion: {
    id: string;
    dia: string;
    horario: string;
    zona: string;
    espacio: string;
    estatus: string;
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
    const url = `/reservaciones/${this.data.selectedReservacion.id}`;

    const body = {
      hora_seleccionada: this.stringToHour(
        this.data.selectedReservacion.horario
      ),
      matricula_alumno: null,
      fecha: this.stringToDate(this.data.selectedReservacion.dia),
      espacio: this.data.selectedReservacion.espacio,
      estatus: 1,
    };

    this._apiService.put(url, body).subscribe((data) => {
      this.onNoClick();
    });
  }
}
