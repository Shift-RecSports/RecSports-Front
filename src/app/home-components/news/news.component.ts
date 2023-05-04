import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Noticia } from 'src/app/classes/noticia';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(
    private _apiService: ApiService) {}

  data: Noticia[] = [];


  ngOnInit(): void {

    const url = '/noticias';

    this._apiService.get(url).subscribe((data) => {
      this.data = data;
      console.log(data);
    });

  }

  redirectToUrl(url: string) {
    window.location.href = url;
  }
}