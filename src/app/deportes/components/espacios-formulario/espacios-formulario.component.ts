import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { Espacio } from 'src/app/classes/espacios';
import { Deporte } from 'src/app/classes/deportes';

import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-espacios-formulario',
  templateUrl: './espacios-formulario.component.html',
  styleUrls: ['./espacios-formulario.component.css'],
})
export class EspaciosFormularioComponent {

  formularioEspacios: FormGroup = new FormGroup({});
  areas = new FormControl('');
  options: string[] = ['CBD1', 'CBD2', 'Wellness Center'];

  selectedFiles?: FileList;
  selectedFileNames: string[] = [];
  preview: string = '';

  deportesControl = new FormControl();
  listaDeportes: Deporte[] = [];


  horarios = new FormControl('');
  horariosSelected: string[] = [];
  horariosSet = new Set();
  listaHorarios: string[] = [
    '6:00',
    '7:00',
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
    '20:00',
    '21:00',
    '22:00',
  ];

  deportesOptions: string[] = []

  filteredOptions: Observable<string[]>;

  constructor(
    private service: AuthService,
    private router: Router,
    public formulario: FormBuilder,
    private _apiService: ApiService,
  ) { }

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
    this.horariosSet = new Set(espacios);
    // const stringSet = `{"${Array.from(this.horariosSelected).join('", "')}"}`;


    console.log("ARRAY DE HORARIOS", this.horariosSelected);
    console.log("SET OF HORARIOS", this.horariosSet);

    // this.formularioEspacios.get('horarios')?.setValue(stringSet);
  }



  ngOnInit() {

    const urlDeportes = '/deportes';
    this._apiService.get(urlDeportes).subscribe((data) => {
      this.listaDeportes = data;
      for (let i = 0; i < this.listaDeportes.length; i++) {
        this.listaDeportes[i].imagen = this._apiService.getImage(
          this.listaDeportes[i].imagen
        );
      }
    });

    console.log("ESTA ES LA LISTA DE DEPORTES" + this.listaDeportes);

    this.filteredOptions = this.horarios.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );

    this.formularioEspacios = this.formulario.group({
      nombre: ['', Validators.required],
      horarios: ['', Validators.required],
      aforo: [null, Validators.required],
      zona: ['', Validators.required],
      imagen: ['', Validators.required],
      deporte: ['', Validators.required]
    });

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
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
    console.log(this.formularioEspacios.value);


    const stringSet = `{"${Array.from(this.horariosSelected).join('", "')}"}`;
    this.formularioEspacios.get('horarios')?.setValue(stringSet);
    console.log("HORARIOS: " + this.formularioEspacios.get('horarios')?.value);

    const url = '/espacios';

    if (this.formularioEspacios.valid) {
      console.log("formulario valido");
      // Form is valid, proceed with saving data
      const formData = new FormData();

      formData.append('nombre', this.formularioEspacios.get('nombre')?.value ?? '');
      formData.append('horarios', this.formularioEspacios.get('horarios')?.value ?? '');
      // formData.append('horarios', "{'6:00', '8:00', '10:00'}");
      formData.append('aforo', this.formularioEspacios.get('aforo')?.value ?? '');
      formData.append('zona', this.formularioEspacios.get('zona')?.value ?? '');
      formData.append('imagen', this.selectedFiles![0], this.selectedFileNames[0]);
      // formData.append('deporte', this.formularioEspacios.get('deporte')?.value ?? '');


      // Get the selected sport object
      const selectedDeporteID = this.formularioEspacios.get('deporte')?.value;
      const selectedDeporte = this.listaDeportes.find(deporte => deporte.id === selectedDeporteID);
      if (selectedDeporte) {
        formData.append('deporte', selectedDeporte.id.toString());
      }

      console.log("formulario validado = ", formData);

      this._apiService.postWithImage(url, formData).subscribe((data) => {
        console.log("API SERVICE:" + data);
        alert(`Espacio ${data.nombre} registrado con éxito}`);

        // Refresh the current page to reset input fields
        location.reload();
      });
    } else {
      console.log("formulario INVALIDO");
      // Form is invalid, display error message
      alert(`No se ha podido guardar el espacio. Verifique los campos solicitados.`);
      Object.values(this.formularioEspacios.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  onCancelClick() {
    this.router.navigate([`deportes`]);
  }
}
