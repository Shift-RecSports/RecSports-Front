import { Component, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { HttpEventType, HttpResponse } from '@angular/common/http';

import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-deporte',
  templateUrl: './nuevo-deporte.component.html',
  styleUrls: ['./nuevo-deporte.component.css'],
})
export class NuevoDeporteComponent {
  espacios = new FormControl('');
  espaciosSelected: string[] = [];
  listaEspacios: string[] = [
    'CBD1 - Cancha1',
    'CBD2 - Cancha1',
    'CBD1 - Cancha2',
    'CBD2 - Cancha2',
  ];

  // CODE FOR UPLOADING IMAGES - Refactor
  // REFERENCE: https://www.bezkoder.com/angular-material-15-image-upload-preview/
  selectedFiles?: FileList;
  selectedFileNames: string[] = [];
  preview: string = '';

  constructor(
    private uploadService: FileUploadService,
    private service: AuthService,
    private router: Router
  ) {}

  changeSelectedEspacios(espacios: string[]) {
    this.espaciosSelected = espacios;
  }

  @ViewChild('matRef') matRef: MatSelect;
  removeSelectedEspacio(espaciosSelected: string) {
    this.matRef.options.forEach((data: MatOption) => {
      if (data._text?.nativeElement.innerHTML == espaciosSelected) {
        data.deselect();
      }
    });
  }

  compareEspacios(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
  }

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

  onCancelClick() {
    this.router.navigate(['/deportes']);
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
