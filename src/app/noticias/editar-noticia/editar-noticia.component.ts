import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Noticia } from 'src/app/classes/noticias';


@Component({
  selector: 'app-editar-noticia',
  templateUrl: './editar-noticia.component.html',
  styleUrls: ['./editar-noticia.component.css']
})
export class EditarNoticiaComponent implements OnInit {
  formularioNoticia: FormGroup;
  noticia: Noticia;
  noticiaId: String = '';

  formattedDate: string = '';
  isDateSelected: boolean = true;
  isHourSelected: boolean = true;

  selectedFiles?: FileList;
  selectedFileNames: string[] = [];
  preview: string = '';


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formulario: FormBuilder,
    private apiService: ApiService,
    private notification: NzNotificationService
  ) { }

  ngOnInit() {
    this.formularioNoticia = this.formulario.group({
      titulo: ['', Validators.required],
      lugar: ['', Validators.required],
      fecha: [null, Validators.required],
      hora: [null, Validators.required],
      imagen: ['', Validators.required],
      url: ['']
    });

    this.route.params.subscribe((params) => {
      this.noticiaId = params['id'];
      const url = `/noticias/${this.noticiaId}`;

      console.log(url);

      this.apiService.get(url).subscribe((data) => {
        this.noticia = data;
        this.noticia.imagen = this.apiService.getImage(
          '/noticias',
          this.noticia.imagen
        );

        this.formularioNoticia!.patchValue({
          titulo: this.noticia.titulo,
          lugar: this.noticia.lugar,
          fecha: this.noticia.fecha,
          hora: this.noticia.hora,
          imagen: this.noticia.imagen,
          url: this.noticia.url
        });

      });
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
      console.log("selectedHour: ", selectedHour);
      const formattedHour = this.formatHour(selectedHour);
      this.formularioNoticia.get('hora')?.setValue(formattedHour);
      console.log("Hora: ",this.formularioNoticia.get('hora')?.value);

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

  enviarDatos() {
    console.log("Boton presionado");
    console.log(this.formularioNoticia!.value);
  
    const url = `/noticias/${this.noticiaId}`;

    if (this.formularioNoticia!.valid) {
      console.log("formulario valido");
      // Form is valid, proceed with saving data
      const formData = new FormData();
  
      formData.append('lugar', this.formularioNoticia!.get('lugar')?.value ?? '');
      formData.append('fecha', this.formularioNoticia!.get('fecha')?.value ?? '');
      formData.append('hora', this.formularioNoticia!.get('hora')?.value ?? '');
      formData.append('titulo', this.formularioNoticia!.get('titulo')?.value ?? '');
      formData.append('imagen', this.selectedFiles![0], this.selectedFileNames[0]);
      formData.append('url', this.formularioNoticia!.get('url')?.value ?? '');
  
      console.log("formulario validado = ", formData);
  
      this.apiService.putWithImage(url, formData).subscribe((data) => {
        console.log(data);

        // NOTIFICACION
        const type = 'success';
        const title = 'Noticia creada con éxito';
        const description = `Título: ${data.titulo}`;
        this.createNotification(type, title, description);
  
        // Send back to noticias
        this.router.navigate(['noticias']);

      });
    } else {
      console.log("formulario INvalido");

      // NOTIFICACION
      const type = 'error';
      const title = 'No se ha podido guardar la noticia.';
      const description = `Verifique los campos solicitados.`;
      this.createNotification(type, title, description);

      Object.values(this.formularioNoticia!.controls).forEach((control) => {
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

  createNotification(type: string, title: string, description: string): void {
    this.notification.create(type, title, description);
  }
}

