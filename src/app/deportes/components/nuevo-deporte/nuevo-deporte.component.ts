import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-nuevo-deporte',
  templateUrl: './nuevo-deporte.component.html',
  styleUrls: ['./nuevo-deporte.component.css'],
})
export class NuevoDeporteComponent {
  formularioDeporte: FormGroup = new FormGroup({}); // Formulario del Deporte

  selectedFiles?: FileList; // IMAGEN
  selectedFileNames: string[] = []; // Nombre de la imagen
  preview: string = ''; // Previsualizacion de la Imagen

  constructor(
    private service: AuthService,
    private router: Router,
    private _apiService: ApiService,
    public formulario: FormBuilder,
    private notification: NzNotificationService
  ) {}

  // Al iniciar la pagina, se inicializa el formulario vacio
  ngOnInit() {
    this.formularioDeporte = this.formulario.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      materiales: [null, Validators.required],
      imagen: ['', Validators.required],
      duracion: [null, Validators.required],
    });
  }

  // Se selecciona una la imagen
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

  // Funcion para convertir la informacion en un FORMDATA y generar una peticion POST a la API
  enviarDatos() {
    console.log('Boton presionado');
    console.log(this.formularioDeporte.value);

    const url = '/deportes';

    if (this.formularioDeporte.valid && this.selectedFiles![0].size < 2000000) {
      console.log('formulario valido');

      // Form is valid, proceed with saving data
      const formData = new FormData();
      formData.append(
        'nombre',
        this.formularioDeporte.get('nombre')?.value ?? ''
      );
      formData.append(
        'descripcion',
        this.formularioDeporte.get('descripcion')?.value ?? ''
      );
      formData.append(
        'materiales',
        this.formularioDeporte.get('materiales')?.value ?? ''
      );
      formData.append(
        'duracion',
        this.formularioDeporte.get('duracion')?.value ?? ''
      );
      formData.append(
        'imagen',
        this.selectedFiles![0],
        this.selectedFileNames[0]
      );

      console.log('formulario validado = ', formData);

      this._apiService.postWithImage(url, formData).subscribe((data) => {
        console.log(data);

        // Notificacion de exito
        const type = 'success';
        const title = 'Deporte creado con éxito.';
        const description = `Título: ${data.nombre}`;
        this.createNotification(type, title, description);

        //Redirecciona a deportes
        this.router.navigate(['/deportes']);
      });
    } else {
      console.log('Formulario Invalido');
      // Notificacion de error
      const type = 'error';
      const title = 'No se ha podido guardar el deporte. ';

      let description = '';
      if (this.selectedFiles && this.selectedFiles![0].size >= 2000000) {
        description = `La imagen no debe exceder las 2MB`;
      } else {
        description = `Verifique los campos solicitados.`;
      }

      this.createNotification(type, title, description);

      Object.values(this.formularioDeporte.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  // Crear notificacion
  createNotification(type: string, title: string, description: string): void {
    this.notification.create(type, title, description);
  }

  onCancelClick() {
    this.router.navigate(['/deportes']);
  }
}
