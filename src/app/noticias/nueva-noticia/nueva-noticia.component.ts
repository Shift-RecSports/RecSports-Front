import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-nueva-noticia',
  templateUrl: './nueva-noticia.component.html',
  styleUrls: ['./nueva-noticia.component.css'],
})
export class NuevaNoticiaComponent {
  formularioNoticia: FormGroup = new FormGroup({});
  message: string = '';
  messageType: string = '';
  formattedDate: string = '';
  isDateSelected: boolean = true;
  isHourSelected: boolean = true;

  selectedFiles?: FileList;
  selectedFileNames: string[] = [];
  preview: string = '';

  constructor(
    private service: AuthService,
    private router: Router,
    public formulario: FormBuilder,
    private _apiService: ApiService
  ) {}

  ngOnInit() {
    this.formularioNoticia = this.formulario.group({
      titulo: ['', Validators.required],
      lugar: ['', Validators.required],
      fecha: [null, Validators.required],
      hora: [null, Validators.required],
      imagen: ['', Validators.required],
      url: [''],
    });
  }

  onDateSelected(selectedDate: Date): void {
    if (selectedDate) {
      // A date has been selected
      this.isDateSelected = true;
      console.log(selectedDate);
      const formattedDate = this.formatDate(selectedDate);
      this.formularioNoticia.get('fecha')?.setValue(formattedDate);
      console.log(this.formularioNoticia.get('fecha')?.value);
    } else {
      // No date has been selected
      this.isDateSelected = false;
      // You can handle this case, e.g., display an error message
    }
  }

  formatDate(date: Date): string {
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  onHourSelected(selectedHour: Date): void {
    if (selectedHour) {
      // A date has been selected
      this.isHourSelected = true;
      console.log('selectedHour: ', selectedHour);
      const formattedHour = this.formatHour(selectedHour);
      this.formularioNoticia.get('hora')?.setValue(formattedHour);
      console.log('Hora: ', this.formularioNoticia.get('hora')?.value);
    } else {
      // No date has been selected
      this.isHourSelected = false;
      // You can handle this case, e.g., display an error message
    }
  }

  formatHour(date: Date): string {
    const hours = String(date.getHours().toString().padStart(2, '0'));
    const minutes = String(date.getMinutes().toString().padStart(2, '0'));

    return `${hours}:${minutes}`;
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

  // enviarDatos() {
  //   console.log("Boton presionado");

  //   console.log(this.formularioNoticia.value);

  //   const url = '/noticias';

  //   if (this.formularioNoticia.valid) {
  //     console.log("formulario valido");
  //     // Form is valid, proceed with saving data
  //     const formData = {
  //       lugar: this.formularioNoticia.get('lugar')?.value ?? '',
  //       fecha: this.formularioNoticia.get('fecha')?.value ?? '',
  //       hora: this.formularioNoticia.get('hora')?.value ?? '',
  //       titulo: this.formularioNoticia.get('titulo')?.value ?? '',
  //       imagen: '',
  //       url: "https://javier.rodriguez.org.mx/itesm/borregos/borrego-blue.png"
  //     };

  //     console.log("formulario validado = " + formData);

  //     this._apiService.post(url, formData).subscribe((data) => {
  //       console.log(data);
  //       alert(`Noticia ${data.titulo} registrada con éxito}`);

  //     // Refresh the current page to reset input fields
  //     location.reload();

  //     });
  //   } else {
  //     console.log("formulario INvalido");
  //     // Form is invalid, display error message
  //     alert(`No se ha podido guardar la noticia. Verifique los campos solicitados.`);
  //     Object.values(this.formularioNoticia.controls).forEach((control) => {
  //       if (control.invalid) {
  //         control.markAsDirty();
  //         control.updateValueAndValidity({ onlySelf: true });
  //       }
  //     });
  //   }
  // }

  enviarDatos() {
    console.log('Boton presionado');
    console.log(this.formularioNoticia.value);

    const url = '/noticias';

    if (this.formularioNoticia.valid) {
      console.log('formulario valido');
      // Form is valid, proceed with saving data
      const formData = new FormData();

      formData.append(
        'lugar',
        this.formularioNoticia.get('lugar')?.value ?? ''
      );
      formData.append(
        'fecha',
        this.formularioNoticia.get('fecha')?.value ?? ''
      );
      formData.append('hora', this.formularioNoticia.get('hora')?.value ?? '');
      formData.append(
        'titulo',
        this.formularioNoticia.get('titulo')?.value ?? ''
      );
      formData.append(
        'imagen',
        this.selectedFiles![0],
        this.selectedFileNames[0]
      );
      formData.append('url', this.formularioNoticia.get('url')?.value ?? '');

      console.log('formulario validado = ', formData);

      this._apiService.postWithImage(url, formData).subscribe((data) => {
        console.log(data);
        alert(`Noticia ${data.titulo} registrada con éxito`);

        // Refresh the current page to reset input fields
        location.reload();
      });
    } else {
      console.log('formulario INvalido');
      // Form is invalid, display error message
      alert(
        `No se ha podido guardar la noticia. Verifique los campos solicitados.`
      );
      Object.values(this.formularioNoticia.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  onCancelClick() {
    this.router.navigate(['noticias']);
  }
}
