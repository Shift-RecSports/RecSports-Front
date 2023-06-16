import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ApiService } from '../service/api.service';

interface mapa {
  id: string;
  imagen: string;
}

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})
export class MapaComponent {
  showAgregarButton = false; // Muestra el boton para agregar, solo el admin debe tener la bandera en TRUE
  selectedFiles?: FileList; // IMAGEN del mapa
  selectedFileNames: string[] = []; // Nombre de la iamgen
  preview: string = ''; // Previsualziacion del mapa
  loading: boolean = false; // Bandera para reconocer si se esta cargando
  subida: boolean = false; // Bandera para saber si el mapa se subio correctamente
  mapaActual: mapa = {
    // Informacion del mapa actual
    id: '',
    imagen: '',
  };

  constructor(
    private service: AuthService,
    private router: Router,
    private _apiService: ApiService
  ) {
    // Se muestra el boton para Agregar unicamente si el usuario corresponde al rol de Admin
    if (this.service.isLoggedIn() && this.service.GetUserRole() == 'ADMIN') {
      this.showAgregarButton = true;
    }
  }

  // Se actualiza la imagen en las variables correspondientes
  selectFiles(event: any): void {
    this.selectedFileNames = []; // Nonbre de la imagen
    this.selectedFiles = event.target.files; // IMAGEN
    this.preview = ''; // Previsualziacion de la imagen

    // Se actualizan las variables
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.preview = e.target.result;
        };
        reader.readAsDataURL(this.selectedFiles[i]);
        this.selectedFileNames.push(this.selectedFiles[i].name);
        this.uploadFile(this.selectedFiles[0]);
      }
    }
  }

  // Funcion para subir una imagen del mapa
  uploadFile(file: File): void {
    this.loading = true;
    const url = '/mapa/';
    const formData = new FormData();
    formData.append('id', this.mapaActual.id.toString());
    formData.append('imagen', file);
    this._apiService.put(url, formData).subscribe((data) => {
      //console.log(data);
      this.subida = true;
      this.loading = false;
      location.reload();
    });
  }

  // Al iniciar la pagina se carga el mapa
  ngOnInit() {
    const url = '/mapa';
    this._apiService.get(url).subscribe((data) => {
      this.mapaActual = data;
      //console.log(this.mapaActual);

      this.mapaActual.imagen = this._apiService.getImage(
        '/mapas',
        this.mapaActual.imagen
      );
    });
  }
}
