import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-nuevo-deporte',
  templateUrl: './nuevo-deporte.component.html',
  styleUrls: ['./nuevo-deporte.component.css'],
})
export class NuevoDeporteComponent {
  formularioDeporte: FormGroup = new FormGroup({});

  selectedFiles?: FileList;
  selectedFileNames: string[] = [];
  preview: string = '';

  constructor(
    private service: AuthService,
    private router: Router,
    private _apiService: ApiService,
    public formulario: FormBuilder,
  ) {}

  ngOnInit() {
    this.formularioDeporte = this.formulario.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      materiales: [null, Validators.required],
      imagen: ['', Validators.required],
      duracion: [null, Validators.required]
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
    console.log("Boton presionado");
    console.log(this.formularioDeporte.value);
  
    const url = '/deportes';
  
    if (this.formularioDeporte.valid) {
      console.log("formulario valido");

      // Form is valid, proceed with saving data
      const formData = new FormData();
      formData.append('nombre', this.formularioDeporte.get('nombre')?.value ?? '');
      formData.append('descripcion', this.formularioDeporte.get('descripcion')?.value ?? '');
      formData.append('materiales', this.formularioDeporte.get('materiales')?.value ?? '');
      formData.append('duracion', this.formularioDeporte.get('duracion')?.value ?? '');
      formData.append('imagen', this.selectedFiles![0], this.selectedFileNames[0]);
  
      console.log("formulario validado = ", formData);
  
      this._apiService.postWithImage(url, formData).subscribe((data) => {
        console.log(data);
        alert(`Deporte registrado con éxito`);
  
        // Refresh the current page to reset input fields
        location.reload();
      });
    } else {
      console.log("Formulario Invalido");
      // Form is invalid, display error message
      alert(`No se ha podido guardar la noticia. Verifique los campos solicitados.`);
      Object.values(this.formularioDeporte.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  onCancelClick() {
    this.router.navigate(['/deportes']);
  }
}
