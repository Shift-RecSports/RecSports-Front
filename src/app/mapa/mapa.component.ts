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
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent {
  showAgregarButton = false;
  selectedFiles?: FileList;
  selectedFileNames: string[] = [];
  preview: string = '';
  subida: boolean = false;
  mapaActual: mapa = {
    id: '',
    imagen: '',
  };

  constructor(
    private service: AuthService,
    private router: Router,
    private _apiService: ApiService
  ) {
    if (this.service.isLoggedIn() && this.service.GetUserRole() == 'ADMIN') {
      this.showAgregarButton = true;
    }
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
        this.uploadFile(this.selectedFiles[0]);
      }
    }
  }

  uploadFile(file: File): void {
    const url = '/mapa/';
    const formData = new FormData();
    formData.append('id', this.mapaActual.id.toString());
    formData.append('imagen', file);
    this._apiService.put(url, formData).subscribe((data) => {
      console.log(data);
      this.subida = true;
    });
  }

  ngOnInit() {
    const url = '/mapa';
    this._apiService.get(url).subscribe((data) => {
      this.mapaActual = data;
      console.log(this.mapaActual);

      this.mapaActual.imagen = this._apiService.getImage(
        '/mapas',
        this.mapaActual.imagen
      )
    });
  }
}