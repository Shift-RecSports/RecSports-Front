import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-nueva-noticia',
  templateUrl: './nueva-noticia.component.html',
  styleUrls: ['./nueva-noticia.component.css']
})


export class NuevaNoticiaComponent {

  lugar: string;
  UnformattedFecha: Date;
  UnformattedHora: Date;
  fecha: string;
  hora: string;
  titulo: string;
  imagen: string;
  url: string;

  formularioNoticia!: FormGroup;
  message: string = '';

  isDateSelected: boolean = true;
  isHourSelected: boolean = true;


  constructor(
    private uploadService: FileUploadService,
    private service: AuthService,
    private router: Router,
    public formulario: FormBuilder,
    private _apiService: ApiService,
  ) {
    this.lugar = '';
    this.fecha = '';
    this.hora = '';
    this.titulo = '';
    this.imagen = '';
    this.url = '';
    this.UnformattedFecha = new Date();
    this.UnformattedHora = new Date();
  }

  ngOnInit() {
    this.formularioNoticia = this.formulario.group({
      titulo: [null, Validators.required],
      lugar: [null, Validators.required],
      UnformattedFecha: [null, Validators.required],
      hora: [null, Validators.required],
      url: [null]
    });
  }

  onDateSelected(selectedDate: Date): void {
    if (selectedDate) {
      // A date has been selected
      this.isDateSelected = true;
      const formattedDate = this.formatDate(selectedDate);
      this.fecha = formattedDate;
    } else {
      // No date has been selected
      this.isDateSelected = false;
      // You can handle this case, e.g., display an error message
    }
  }

  onHourSelected(selectedHour: Date): void {
    if (selectedHour) {
      // A date has been selected
      console.log(selectedHour);
      this.isHourSelected = true;
      this.hora = this.formatHour(selectedHour);
      console.log(this.hora);
    } else {
      // No date has been selected
      this.isHourSelected = false;
      // You can handle this case, e.g., display an error message
    }
  }

  formatHour(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  enviarDatos() {

    console.log("Boton presionado");

    const url = '/noticias';




    if (this.formularioNoticia.valid) {
      this._apiService.post(url, {
        lugar: this.lugar,
        fecha: this.fecha,
        hora: this.hora,
        titulo: this.titulo,
        imagen: 'https://javier.rodriguez.org.mx/itesm/borregos/borrego-blue.png',
        url: 'https://javier.rodriguez.org.mx/itesm/borregos/borrego-blue.png'
      })
        .subscribe((data) => {
          console.log(data);
          this.message = `Noticia ${data.titulo} registrada con éxito}`;
        });
    } else {
      Object.values(this.formularioNoticia.controls).forEach(control => {
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











  // CODE FOR UPLOADING IMAGES - Refactor
  // REFERENCE: https://www.bezkoder.com/angular-material-15-image-upload-preview/
  selectedFiles?: FileList;
  selectedFileNames: string[] = [];
  preview: string = '';

  selectFiles(event: any): void {
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;

    this.preview = '';

    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.preview = e.target.result;
        };

        reader.readAsDataURL(this.selectedFiles[i]);

        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }

  uploadFiles(): void {
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

  upload(idx: number, file: File): void {
    if (file) {
      this.uploadService.upload(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
          } else if (event instanceof HttpResponse) {
            const msg = file.name + ': Successful!';
          }
        },
        (err: any) => {
          let msg = file.name + ': Failed!';

          if (err.error && err.error.message) {
            msg += ' ' + err.error.message;
          }
        }
      );
    }
  }

  // onDateSelected(unformattedFecha: Date | null): void {
  //   if (unformattedFecha) {
  //     // A date has been selected
  //     this.isDateSelected = true;
  //     const formattedDate = this.formatDate(unformattedFecha);
  //     this.fecha = formattedDate;
  //   } else {
  //     // No date has been selected
  //     this.isDateSelected = false;
  //     // You can handle this case, e.g., display an error message
  //   }
  // }
}

// SERVICE FOR IMAGES
@Injectable({
  providedIn: 'root',
})
class FileUploadService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
}

