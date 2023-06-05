import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

interface reservacionType {
  reservacion: {
    id: string;
    hora_seleccionada:
      | '08:00:00'
      | '09:00:00'
      | '10:00:00'
      | '11:00:00'
      | '12:00:00'
      | '13:00:00'
      | '14:00:00'
      | '15:00:00'
      | '16:00:00'
      | '17:00:00'
      | '18:00:00'
      | '19:00:00'
      | '20:00:00'
      | '21:00:00';
    matricula_alumno: string | null;
    fecha: string;
    espacio: string;
    estatus: string;
    zona: string;
    espacio_nombre: string;
    disabled: boolean;
  };
  refreshDay: (id: number) => void;
}

@Component({
  selector: 'app-modal-reservacion',
  templateUrl: './modal-reservacion.component.html',
  styleUrls: ['./modal-reservacion.component.css'],
})
export class ModalReservacionComponent {
  showLoading: boolean = false;
  showSucces: boolean = false;
  showFailed: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ModalReservacionComponent>,
    private _apiService: ApiService,
    private service: AuthService,
    private router: Router,
    private notification: NzNotificationService,
    @Inject(MAT_DIALOG_DATA) public data: reservacionType
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick() {
    this.showLoading = true;

    if (this.service.isLoggedIn()) {
      const url = `/reservaciones`;

      this.data.reservacion.matricula_alumno = this.service.GetUserName()!;
      this._apiService.post(url, this.data.reservacion).subscribe((data) => {
        console.log(data);
        this.showLoading = false;
        this.showSucces = true;

        //  if(someError) {
        //    this.showFailed = true
        //  }
      });
    }
  }

  async onCancelReservacion() {
    if (this.service.isLoggedIn() && this.service.GetUserRole() == 'ADMIN') {
      const url = `/reservaciones/${this.data.reservacion.id}`;

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
          const title = `No se ha logrado cancelar la reservacion`;
          const description = e.error.message;

          this.createNotification(type, title, description);
          this.onNoClick();
        }
      );
    }
  }

  onMisReservacionesClick() {
    this.router.navigate(['/reservaciones']);
    this.dialogRef.close();
  }

  createNotification(type: string, title: string, description: string): void {
    this.notification.create(type, title, description);
  }
}
