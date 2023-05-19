import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { Noticia } from '../classes/noticias';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {
  private sub: any;
  listaNoticias: Noticia[] = [];
  url: string = ''

  constructor(
    private router: Router,
    private _apiService: ApiService,
    private route: ActivatedRoute,
  ){}

  ngOnInit(){
    this.sub = this.route.params.subscribe((params) => {
      const url = `/noticias`;
      this._apiService.get(url).subscribe((data) => {
        this.listaNoticias = data;
        console.log(data)
      });
    });

  }

  redirectToUrl(url: string) {
    window.open(url, '_blank');
  }

  nuevaNoticia() {
    this.router.navigate(['/formulario-noticia']);
  }

}
