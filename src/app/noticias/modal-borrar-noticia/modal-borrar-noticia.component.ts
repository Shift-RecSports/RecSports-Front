import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { Noticia } from 'src/app/classes/noticias';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface noticiaType {
  noticia: Noticia;
}

@Component({
  selector: 'app-modal-borrar-noticia',
  templateUrl: './modal-borrar-noticia.component.html',
  styleUrls: ['./modal-borrar-noticia.component.css']
})
export class ModalBorrarNoticiaComponent {
  showLoading: boolean = false;
  showSucces: boolean = false;
  showFailed: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ModalBorrarNoticiaComponent>,
    private _apiService: ApiService,
    private service: AuthService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: noticiaType
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  async onBorrarNoticia() {
    if (this.service.isLoggedIn() && this.service.GetUserRole() == 'ADMIN') {
      const url = `/noticias/${this.data.noticia.id}`;

      this._apiService.delete(url).subscribe((data) => {
        this.onNoClick();
        window.location.reload();
      });
    }
  }
}

