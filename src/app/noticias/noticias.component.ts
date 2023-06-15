import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { Noticia } from '../classes/noticias';
import { MatDialog } from '@angular/material/dialog';
import { ModalBorrarNoticiaComponent } from './modal-borrar-noticia/modal-borrar-noticia.component';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css'],
})
export class NoticiasComponent implements OnInit {
  private sub: any;
  listaNoticias: Noticia[] = []; // Lista de Noticias

  constructor(
    private router: Router,
    private _apiService: ApiService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  // Al iniciar la pagina, se realiza un GET para obtener la lista de noticias
  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      const url = `/noticias`;
      this._apiService.get(url).subscribe((data) => {
        this.listaNoticias = data;
        for (let i = 0; i < this.listaNoticias.length; i++) {
          this.listaNoticias[i].imagen = this._apiService.getImage(
            '/noticias',
            this.listaNoticias[i].imagen
          );
        }
        console.log(data);
      });
    });
  }

  // Modal para eliminar una notifica seleccionada
  openDeleteNoticia(noticia: Noticia): void {
    const dialogRef = this.dialog.open(ModalBorrarNoticiaComponent, {
      data: { noticia: noticia },
    });
  }

  // Al hacer click a una noticia, se redirige al URL de la misma
  redirectToUrl(url: string) {
    window.open(url, '_blank');
  }

  // Redireccion para crear una nueva noticia
  nuevaNoticia() {
    this.router.navigate(['/formulario-noticia']);
  }
}
