import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

// export interface DialogData {
//   animal: string;
//   name: string;
// }

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
    public dialogRef: MatDialogRef<ModalReservacionComponent>, // @Inject(MAT_DIALOG_DATA) public data: DialogData4
    private _apiService: ApiService,
    private router: Router
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick() {
    this.showLoading = true;

    const url = `/deportes`;
    this._apiService.get(url).subscribe((data) => {
      // console.log(data);
      this.showLoading = false;
      this.showSucces = true;

      // if(someError) {
      //   this.showFailed = true
      // }
    });
  }

  onMisReservacionesClick() {
    this.router.navigate(['/reservaciones']);
    this.dialogRef.close();
  }
}
