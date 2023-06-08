import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Deporte } from 'src/app/classes/deportes';
import { MatDialog } from '@angular/material/dialog';
import { ModalBorrarDeporteComponent } from '../../deporte-seleccionado/modal-borrar-deporte/modal-borrar-deporte.component';

@Component({
  selector: 'app-editar-deporte',
  templateUrl: './editar-deporte.component.html',
  styleUrls: ['./editar-deporte.component.css'],
})
export class EditarDeporteComponent implements OnInit {
  formularioDeporte: FormGroup;
  deporte: Deporte;
  deporteId: String = '';

  selectedFiles?: FileList;
  selectedFileNames: string[] = [];
  preview: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formulario: FormBuilder,
    private apiService: ApiService,
    private notification: NzNotificationService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.formularioDeporte = this.formulario.group({
      id: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      materiales: [null, Validators.required],
      imagen: '',
      duracion: [null, Validators.required],
    });

    this.route.params.subscribe((params) => {
      this.deporteId = params['id'];
      const url = `/deportes/${this.deporteId}`;

      console.log(url);

      this.apiService.get(url).subscribe((data) => {
        this.deporte = data;
        // this.deporte.imagen = this.apiService.getImage(
        //   '/deportes',
        //   this.deporte.imagen
        // );

        this.formularioDeporte.patchValue({
          id: this.deporteId,
          nombre: this.deporte.nombre,
          descripcion: this.deporte.descripcion,
          materiales: this.deporte.materiales,
          duracion: this.deporte.duracion,
          imagen: this.deporte.imagen,
        });
      });
    });
  }

  selectFiles(event: any): void {
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;
    this.preview = '';

    if (this.selectedFiles && this.selectedFiles[0]) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.preview = e.target.result;
      };

      reader.readAsDataURL(this.selectedFiles[0]);
      this.selectedFileNames.push(this.selectedFiles[0].name);
    }
  }

  enviarDatos() {
    console.log('Boton presionado');
    console.log(this.formularioDeporte.value);

    const url = `/deportes`;

    if (this.formularioDeporte.valid && this.selectedFiles![0].size < 2000000) {
      console.log('formulario valido');

      // Form is valid, proceed with saving data
      const formData = new FormData();
      formData.append('id', this.formularioDeporte.get('id')?.value ?? '');
      formData.append(
        'nombre',
        this.formularioDeporte.get('nombre')?.value ?? ''
      );
      formData.append(
        'descripcion',
        this.formularioDeporte.get('descripcion')?.value ?? null
      );
      formData.append(
        'materiales',
        this.formularioDeporte.get('materiales')?.value ?? ''
      );
      formData.append(
        'duracion',
        this.formularioDeporte.get('duracion')?.value ?? ''
      );
      //formData.append('imagen', this.selectedFiles![0], this.selectedFileNames[0]);

      // Check if a new file is selected
      if (this.selectedFiles && this.selectedFiles[0]) {
        // A new file is selected, add it to the formData
        formData.append(
          'imagen',
          this.selectedFiles![0],
          this.selectedFileNames[0]
        );
      } else {
        // No new file selected, keep the previous image
        formData.append('imagen', this.formularioDeporte.get('imagen')?.value);
      }

      console.log('formulario validado = ', formData);

      this.apiService.putWithImage(url, formData).subscribe((data) => {
        console.log(data);

        // NOTIFICACION
        const type = 'success';
        const title = 'Deporte actualizado con éxito';
        const description = `Nombre: ${data.nombre}`;
        this.createNotification(type, title, description);

        // Send back to deportes
        this.router.navigate(['deportes']);
      });
    } else {
      console.log('formulario Invalido');

      // NOTIFICACION
      const type = 'error';
      const title = 'No se ha podido actualizar el deporte.';

      let description = '';
      if (this.selectedFiles && this.selectedFiles![0].size >= 2000000) {
        description = `La imagen no debe exceder las 2MB`;
      } else {
        description = `Verifique los campos solicitados.`;
      }

      this.createNotification(type, title, description);

      Object.values(this.formularioDeporte.controls).forEach((control) => {
        if (control.invalid) {
          console.log(`Invalid field: ${control.value}`);
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  openDeleteDeporte(deporte: Deporte): void {
    const dialogRef = this.dialog.open(ModalBorrarDeporteComponent, {
      data: { deporte: deporte },
    });
  }

  onCancelClick() {
    this.router.navigate(['deportes']);
  }

  createNotification(type: string, title: string, description: string): void {
    this.notification.create(type, title, description);
  }
}
