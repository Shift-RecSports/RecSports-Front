import { Component, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { HttpEventType, HttpResponse } from '@angular/common/http';

import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { AuthService } from 'src/app/service/auth.service';
import { Data, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { newDeporte } from 'src/app/classes/deportes';
import { Deporte } from 'src/app/classes/deportes';

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

  message: string = '';

  nombre: string;
  descripcion: string;
  materiales: string;
  imagen: string;
  duracion: number;

  selectedFiles?: FileList;
  selectedFileNames: string[] = [];
  preview: string = '';

  constructor(
    private service: AuthService,
    private router: Router,
    private _apiService: ApiService
  ) {
    this.nombre = '';
    this.descripcion = '';
    this.materiales = '';
    this.imagen = '';
    this.duracion = 0;
  }

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
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.preview = e.target.result;
      };

      reader.readAsDataURL(this.selectedFiles[0]);
      this.selectedFileNames.push(this.selectedFiles[0].name);
    }
  }

  guardarDeporte() {
    const formData: FormData = new FormData();
    formData.append(
      'imagen',
      this.selectedFiles![0],
      this.selectedFileNames[0]
    );
    formData.append('nombre', this.nombre);
    formData.append('descripcion', this.descripcion);
    formData.append('materiales', this.materiales);
    formData.append('duracion', this.duracion.toString());

    const url = '/deportes';
    this._apiService.postWithImage(url, formData).subscribe((data) => {
      console.log(data);
      // this.message = `Imagen subida: ${data} registrado con éxito}`;
    });
  }

  onCancelClick() {
    this.router.navigate(['/deportes']);
  }
}
