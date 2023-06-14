import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { ApiService } from 'src/app/service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Deporte } from 'src/app/classes/deportes';
import { Espacio } from 'src/app/classes/espacios';

@Component({
  selector: 'app-editar-espacio',
  templateUrl: './editar-espacio.component.html',
  styleUrls: ['./editar-espacio.component.css'],
})
export class EditarEspacioComponent implements OnInit {
  // formularioEspacio: FormGroup;
  formularioEspacio: FormGroup = new FormGroup({});
  espacio: Espacio;
  espacioId: String = '';
  deporteId: String = '';


  //ZONA
  areas = new FormControl('');
  options: string[] = ['CBD1', 'CBD2', 'Wellness Center'];

  // UPLOAD FILES
  selectedFiles?: FileList;
  selectedFileNames: string[] = [];
  preview: string = '';

  // DEPORTES
  listaDeportes: Deporte[] = [];

  // HORARIOS
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

  // INPUT CONTROLLERS
  horariosChanged: boolean = false;
  deporteChanged: boolean = false;

  filteredOptions: Observable<string[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formulario: FormBuilder,
    private apiService: ApiService,
    private notification: NzNotificationService
  ) {}

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
    //console.log("ARRAY DE HORARIOS", this.horariosSelected);
  }

  horariosToString(): string {
    // Reformats array ["7:00", "8:00", "9:00"] to string "{"7:00", "8:00", "9:00"}"
    const horarioString = `{${this.horariosSelected.join(', ')}}`;
    return horarioString;
  }

  // stringToHorarios(horarioString: string): string[] {
  //   // Remove the outer curly braces from the string
  //   const innerString = horarioString.slice(1, -1);

  //   // Split the inner string by commas
  //   const horarioArray = innerString.split(", ");

  //   return horarioArray;
  // }

  ngOnInit() {
    this.formularioEspacio = this.formulario.group({
      id: [''],
      nombre: ['', Validators.required],
      horarios: ['', Validators.required],
      aforo: [null, Validators.required],
      zona: ['', Validators.required],
      imagen: '',
      deporte: ['', Validators.required],
    });

    const urlDeportes = '/deportes';
    this.apiService.get(urlDeportes).subscribe((data) => {
      this.listaDeportes = data;
      for (let i = 0; i < this.listaDeportes.length; i++) {
        this.listaDeportes[i].imagen = this.apiService.getImage(
          this.listaDeportes[i].imagen
        );
      }
    });

    this.filteredOptions = this.horarios.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );

    this.route.params.subscribe((params) => {
      this.deporteId = params['id'];
      const url = `/espacios/${this.espacioId}`;
      `/espacios/deporte/${this.deporteId}`;

      console.log(url);

      this.apiService.get(url).subscribe((data) => {
        this.espacio = data;

        this.formularioEspacio.patchValue({
          id: this.espacioId,
          nombre: this.espacio.nombre,
          horarios: this.espacio.horarios,
          aforo: this.espacio.aforo,
          zona: this.espacio.zona,
          deporte: this.espacio.deporte,
          imagen: this.espacio.imagen,
        });
      });
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

  getIdOfSelectedDeporte(): string {
    const selectedDeporteNombre = this.formularioEspacio.get('deporte')?.value;
    //console.log("VALUE EN FORM-DEPORTE-FIELD" + this.formularioEspacios.get('deporte')?.value);

    const selectedDeporte = this.listaDeportes.find(
      (deporte) => deporte.nombre === selectedDeporteNombre
    );
    console.log('selectedDeporte' + selectedDeporte);

    //console.log(selectedDeporte!.id);
    return selectedDeporte!.id.toString();
  }

  enviarDatos() {
    console.log('Boton presionado');
    console.log(this.formularioEspacio.value);

    const url = `/deportes`;

    this.formularioEspacio.get('horarios')?.valueChanges.subscribe(() => {
      this.horariosChanged = true;
    });

    this.formularioEspacio.get('deporte')?.valueChanges.subscribe(() => {
      this.deporteChanged = true;
    });

    if (this.formularioEspacio.valid && this.selectedFiles![0].size < 2000000) {
      console.log('formulario valido');

      // Form is valid, proceed with saving data
      const formData = new FormData();
      formData.append('id', this.formularioEspacio.get('id')?.value ?? '');
      formData.append(
        'nombre',
        this.formularioEspacio.get('nombre')?.value ?? ''
      );
      // formData.append('horarios', this.horariosToString());

      if (this.horariosChanged) {
        formData.append('horarios', this.horariosToString());
      } else {
        formData.append(
          'horarios',
          this.formularioEspacio.get('horarios')?.value ?? ''
        );
      }

      formData.append(
        'aforo',
        this.formularioEspacio.get('aforo')?.value ?? ''
      );
      formData.append('zona', this.formularioEspacio.get('zona')?.value ?? '');
      // formData.append('deporte', this.getIdOfSelectedDeporte());

      if (this.deporteChanged) {
        formData.append('deporte', this.getIdOfSelectedDeporte());
      } else {
        formData.append(
          'deporte',
          this.formularioEspacio.get('deporte')?.value ?? ''
        );
      }

      // Check if a new file is selected
      if (this.selectedFiles && this.selectedFiles[0]) {
        // A new file is selected, add it to the formData
        formData.append(
          'imagen',
          this.selectedFiles![0],
          this.selectedFileNames[0]
        );
      } else {
        // No new file selected, keep the previous image
        formData.append('imagen', this.formularioEspacio.get('imagen')?.value);
      }

      console.log('formulario validado = ', formData.getAll);

      this.apiService.putWithImage(url, formData).subscribe((data) => {
        console.log(data);

        // NOTIFICACION
        const type = 'success';
        const title = 'Deporte actualizado con éxito';
        const description = 'Operación exitosa';
        this.createNotification(type, title, description);

        // Send back to deportes
        this.router.navigate(['deportes']);
      });
    } else {
      console.log('formulario Invalido');

      // NOTIFICACION
      const type = 'error';
      const title = 'No se ha podido actualizar el deporte.';

      let description = '';
      if (this.selectedFiles && this.selectedFiles![0].size >= 2000000) {
        description = `La imagen no debe exceder las 2MB`;
      } else {
        description = `Verifique los campos solicitados.`;
      }

      this.createNotification(type, title, description);

      Object.values(this.formularioEspacio.controls).forEach((control) => {
        if (control.invalid) {
          console.log(`Invalid field: ${control.value}`);
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  onCancelClick() {
    this.router.navigate(['deportes/'+this.deporteId]);
  }

  createNotification(type: string, title: string, description: string): void {
    this.notification.create(type, title, description);
  }
}
