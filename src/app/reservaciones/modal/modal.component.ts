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

  onConfirmClick() {
    const url = `/reservaciones/${this.data.selectedReservacion.id}`;
    this._apiService.delete(url).subscribe((data) => {
      console.log('Reservacion eliminada');
      this.onNoClick();
    });
  }
}
