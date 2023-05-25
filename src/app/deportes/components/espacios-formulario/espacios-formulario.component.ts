import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
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

  nombre: string;
  hora_inicio: string;
  hora_fin: string;
  aforo: string;
  zona: string;
  imagen: string;
  deporte: string;

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
    private service: AuthService,
    private router: Router,
    public formulario: FormBuilder,
    private _apiService: ApiService
  ) {
    this.nombre = '';
    this.hora_inicio = '08:00:00';
    this.hora_fin = '19:00:00';
    this.aforo = '';
    this.zona = '';
    this.imagen = '';
    this.deporte = '';
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

  selectedFiles?: FileList;
  selectedFileNames: string[] = [];
  preview: string = '';

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

  guardarEspacio() {
    const formData: FormData = new FormData();
    formData.append(
      'imagen',
      this.selectedFiles![0],
      this.selectedFileNames[0]
    );
    // formData.append('nombre', this.nombre);
    // formData.append('descripcion', this.descripcion);
    // formData.append('materiales', this.materiales);
    // formData.append('duracion', this.duracion.toString());

    // const url = '/deportes';
    // this._apiService.postWithImage(url, formData).subscribe((data) => {
    //   console.log(data);
    //   // this.message = `Imagen subida: ${data} registrado con éxito}`;
    // });
  }

  onCancelClick() {
    this.router.navigate([`deportes`]);
  }
}
