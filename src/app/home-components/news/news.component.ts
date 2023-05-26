import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api.service';
import { Noticia } from 'src/app/classes/noticias';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})



export class NewsComponent implements OnInit{

  // Routing
  private sub: any;
  listaNoticias: Noticia[] = [];


  // Ajustar a image para que pueda leer de render
  // noticiaImage: string = getImage();

  constructor(
    private service: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private _apiService: ApiService
  ) {}


  ngOnInit():void {
    this.sub = this.route.params.subscribe((params) => {
      const url = `/noticias`;
      this._apiService.get(url).subscribe((data) => {
        this.listaNoticias = data;
        for (let i = 0; i < this.listaNoticias.length; i++) {
          this.listaNoticias[i].imagen = this._apiService.getImage(
            this.listaNoticias[i].imagen
          );
        }
        console.log(data)
      });
    });
  }

  redirectToUrl(url: string) {
    window.open(url, '_blank');
  }

  
}

