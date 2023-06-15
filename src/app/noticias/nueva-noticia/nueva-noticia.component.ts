import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-nueva-noticia',
  templateUrl: './nueva-noticia.component.html',
  styleUrls: ['./nueva-noticia.component.css'],
})
export class NuevaNoticiaComponent {
  formularioNoticia: FormGroup = new FormGroup({});
  formattedDate: string = '';
  isDateSelected: boolean = true; // Bandera para saber si la fecha es seleccionada
  isHourSelected: boolean = true; // Bandera para saber si la hora es seleccionada

  selectedFiles?: FileList; // Lista para imagen de la noticia
  selectedFileNames: string[] = []; // Nombre del archivo de imagenes
  preview: string = ''; // Imagen de Previsualizacion

  constructor(
    private service: AuthService,
    private router: Router,
    public formulario: FormBuilder,
    private _apiService: ApiService,
    private notification: NzNotificationService
  ) {}

  // Al iniciar la aplicacion, se inizializa el formulario vacio
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

  // Funcion para seleccionara una fecha y agregarla al formulario
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

  // Funcion para cambiar el formato de la fecha para ser recibido por la API
  formatDate(date: Date): string {
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  // Funcion para guardar en el formulario la hora seleccionada
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

  // Funcion para cambiar el formato de una Hora para ser recibido por la API
  formatHour(date: Date): string {
    const hours = String(date.getHours().toString().padStart(2, '0'));
    const minutes = String(date.getMinutes().toString().padStart(2, '0'));

    return `${hours}:${minutes}`;
  }

  // Al seleccionar una imagen se agrega a selectedFiles
  selectFiles(event: any): void {
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files; // Se almacena la imagen
    this.preview = ''; // Para previsualizacion de la imagen

    if (this.selectedFiles && this.selectedFiles[0]) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.preview = e.target.result;
      };

      reader.readAsDataURL(this.selectedFiles[0]);
      this.selectedFileNames.push(this.selectedFiles[0].name);
    }
  }

  // Funcion que llama a la API para crear una nueva ntoicia con el formulario creado
  enviarDatos() {
    console.log('Boton presionado');
    console.log(this.formularioNoticia.value);

    const url = '/noticias';

    if (this.formularioNoticia.valid && this.selectedFiles![0].size < 2000000) {
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

        // NOTIFICACION de exito
        const type = 'success';
        const title = 'Noticia creada con éxito';
        const description = `Título: ${data.titulo}`;
        this.createNotification(type, title, description);

        // Send back to noticias
        this.router.navigate(['noticias']);
      });
    } else {
      console.log('formulario INvalido');
      // Form is invalid, display error message
      // NOTIFICACION de error
      const type = 'error';
      const title = 'No se ha podido guardar la noticia.';

      let description = '';
      if (this.selectedFiles && this.selectedFiles![0].size >= 2000000) {
        description = `La imagen no debe exceder las 2MB`;
      } else {
        description = `Verifique los campos solicitados.`;
      }

      // Se crea la notificacion
      this.createNotification(type, title, description);

      Object.values(this.formularioNoticia.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  // Funcion para crear una notificacion
  createNotification(type: string, title: string, description: string): void {
    this.notification.create(type, title, description);
  }

  // Al cancelar, se redirgie a la pagina de noticias
  onCancelClick() {
    this.router.navigate(['noticias']);
  }
}
