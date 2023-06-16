import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { Noticia } from 'src/app/classes/noticias';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';

interface noticiaType {
  noticia: Noticia;
}

@Component({
  selector: 'app-modal-borrar-noticia',
  templateUrl: './modal-borrar-noticia.component.html',
  styleUrls: ['./modal-borrar-noticia.component.css'],
})
export class ModalBorrarNoticiaComponent {
  showLoading: boolean = false; // Se muestra el icono de cargando
  showSucces: boolean = false; // Se muestra si la eliminacion de la noticia es existosa
  showFailed: boolean = false; // Se muestra si la eliminacion de la noticia es fallida

  constructor(
    public dialogRef: MatDialogRef<ModalBorrarNoticiaComponent>,
    private _apiService: ApiService,
    private service: AuthService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: noticiaType,
    private notification: NzNotificationService
  ) {}

  // Al hacer click fuera del modal o en la "X" se cierra el modal
  onNoClick(): void {
    this.dialogRef.close();
  }

  // Se elimina una noticia al llamara a la API con el ID correspondiente
  async onBorrarNoticia() {
    if (this.service.isLoggedIn() && this.service.GetUserRole() == 'ADMIN') {
      const url = `/noticias/${this.data.noticia.id}`;

      this._apiService.delete(url).subscribe((data) => {
        this.onNoClick();
        window.location.reload();
      });
    }

    // NOTIFICACION de Exito
    const type = 'success';
    const title = 'Se ha eliminado la noticia.';
    const description = `Operación exitosa`;
    this.deleteNotification(type, title, description);
  }

  // Funcion para activar la notificacion
  deleteNotification(type: string, title: string, description: string): void {
    this.notification.create(type, title, description);
  }
}
