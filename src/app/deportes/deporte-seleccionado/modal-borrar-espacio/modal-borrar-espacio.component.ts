import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Espacio } from 'src/app/classes/espacios';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';

interface espacioType {
  espacio: Espacio;
}

@Component({
  selector: 'app-modal-borrar-espacio',
  templateUrl: './modal-borrar-espacio.component.html',
  styleUrls: ['./modal-borrar-espacio.component.css'],
})
export class ModalBorrarEspacioComponent {
  showLoading: boolean = false;
  showSucces: boolean = false;
  showFailed: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ModalBorrarEspacioComponent>,
    private _apiService: ApiService,
    private service: AuthService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: espacioType
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  async onCancelReservacion() {
    if (this.service.isLoggedIn() && this.service.GetUserRole() == 'ADMIN') {
      const url = `/espacios/${this.data.espacio.id}`;

      this._apiService.delete(url).subscribe((data) => {
        this.onNoClick();
        window.location.reload();
      });
    }
  }
}
