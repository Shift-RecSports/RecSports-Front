import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { Deporte } from 'src/app/classes/deportes';

import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-espacios-formulario',
  templateUrl: './espacios-formulario.component.html',
  styleUrls: ['./espacios-formulario.component.css'],
})
export class EspaciosFormularioComponent {
  formularioEspacios: FormGroup = new FormGroup({}); // Formulario de Espacios
  areas = new FormControl(''); // Areas
  options: string[] = ['CBD1', 'CBD2', 'Wellness Center']; // Opciones de Area

  selectedFiles?: FileList; // IMAGEN
  selectedFileNames: string[] = []; // Nombre de la imagen
  preview: string = ''; // Previsualizacion de la imagen

  listaDeportes: Deporte[] = []; // Llista de Deportes para agregarlo al espacio

  // Horarios
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

  filteredOptions: Observable<string[]>;

  constructor(
    private service: AuthService,
    private router: Router,
    public formulario: FormBuilder,
    private _apiService: ApiService,
    private notification: NzNotificationService
  ) {}

  @ViewChild('matRef') matRef: MatSelect;
  // Deseleccionado el Hoarario
  removeSelectedHorario(horariosSelected: string) {
    this.matRef.options.forEach((data: MatOption) => {
      if (data._text?.nativeElement.innerHTML == horariosSelected) {
        data.deselect();
      }
    });
  }

  // Cambia el area seleccionada
  changeSelectedEspacios(espacios: string[]) {
    this.horariosSelected = espacios;
    //console.log("ARRAY DE HORARIOS", this.horariosSelected);
  }

  // Cambia el formato del horario
  horariosToString(): string {
    // Reformats array ["7:00", "8:00", "9:00"] to string "{"7:00", "8:00", "9:00"}"
    const horarioString = `{${this.horariosSelected.join(', ')}}`;
    return horarioString;
  }

  // Al iniciar el componente, se obtienen todos los deportes para mostrarlos al usuario
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
      deporte: ['', Validators.required],
    });
  }

  // Filtro
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  // Seleccion de Imagen
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

  // Obntiene el ID de un deporte seleccionado
  getIdOfSelectedDeporte(): string {
    const selectedDeporteNombre = this.formularioEspacios.get('deporte')?.value;
    //console.log("VALUE EN FORM-DEPORTE-FIELD" + this.formularioEspacios.get('deporte')?.value);

    const selectedDeporte = this.listaDeportes.find(
      (deporte) => deporte.nombre === selectedDeporteNombre
    );
    //console.log("selectedDeporte" + selectedDeporte);

    //console.log(selectedDeporte!.id);
    return selectedDeporte!.id.toString();
  }

  // POST para crear un espacio y convertir la informacion a FORM Data
  enviarDatos() {
    console.log('Boton presionado');
    console.log(this.formularioEspacios.value);

    const url = '/espacios';

    if (
      this.formularioEspacios.valid &&
      this.selectedFiles![0].size < 2000000
    ) {
      console.log('formulario valido');
      // Form is valid, proceed with saving data
      const formData = new FormData();

      formData.append(
        'nombre',
        this.formularioEspacios.get('nombre')?.value ?? ''
      );
      formData.append('horarios', this.horariosToString());
      formData.append(
        'aforo',
        this.formularioEspacios.get('aforo')?.value ?? ''
      );
      formData.append('zona', this.formularioEspacios.get('zona')?.value ?? '');
      formData.append(
        'imagen',
        this.selectedFiles![0],
        this.selectedFileNames[0]
      );
      formData.append('deporte', this.getIdOfSelectedDeporte());

      this._apiService.postWithImage(url, formData).subscribe((data) => {
        // Notificacion de exito
        const type = 'success';
        const title = 'Espacio creado con éxito.';
        const description = `Título: ${data.nombre}`;
        this.createNotification(type, title, description);

        //Redirecciona a deportes
        this.router.navigate([`/deportes/${this.getIdOfSelectedDeporte()}`]);
      });
    } else {
      console.log('formulario INVALIDO');
      // Notificacion de error
      const type = 'error';
      const title = 'No se ha podido guardar el espacio. ';

      let description = '';
      if (this.selectedFiles && this.selectedFiles![0].size >= 2000000) {
        description = `La imagen no debe exceder las 2MB`;
      } else {
        description = `Verifique los campos solicitados.`;
      }

      this.createNotification(type, title, description);

      Object.values(this.formularioEspacios.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  // Funcion para crear notificaciones
  createNotification(type: string, title: string, description: string): void {
    this.notification.create(type, title, description);
  }

  onCancelClick() {
    this.router.navigate([`deportes`]);
  }
}
