import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { Route, Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { Espacio } from 'src/app/classes/espacios';

import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-espacios-formulario',
  templateUrl: './espacios-formulario.component.html',
  styleUrls: ['./espacios-formulario.component.css'],
})
export class EspaciosFormularioComponent {

  areas = new FormControl('');
  options: string[] = ['CBD1', 'CBD2', 'Wellness Center'];

  horarios = new FormControl('');
  horariosSelected: string[] = [];
  listaHorarios: string[] = [
    '8:00',
    '9:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
  ];

  filteredOptions: Observable<string[]>;

  formularioEspacios!: FormGroup;
  message: string = '';

  constructor(
    private uploadService: FileUploadService,
    private service: AuthService,
    private router: Router,
    public formulario: FormBuilder,
    private _apiService: ApiService,
  ) {
    this.formularioEspacios=this.formulario.group({
      nombre:[''],
      hora_inicio:[''],
      hora_fin:[''],
      aforo:[''],
      zona:[''],
    })
  }

  @ViewChild('matRef') matRef: MatSelect;
  removeSelectedHorario(horariosSelected: string) {
    this.matRef.options.forEach((data: MatOption) => {
      if (data._text?.nativeElement.innerHTML == horariosSelected) {
        data.deselect();
      }
    });
  }
  changeSelectedEspacios(espacios: string[]) {
    this.horariosSelected = espacios;
  }

  ngOnInit() {
    this.filteredOptions = this.horarios.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
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

  enviarDatos() {

    console.log("Boton presionado");

    console.log(this.formularioEspacios);
    
    const url = '/espacios';

    this._apiService.post(url, {body: this.formularioEspacios}).subscribe((data) => {
      this.message = `Matricula registrada con éxito: ${data.matricula}`;
    });

  }

  onCancelClick() {
    this.router.navigate(['deportes/futbol']);
  }
}

// SERVICE FOR IMAGES
@Injectable({
  providedIn: 'root',
})
class FileUploadService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

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
