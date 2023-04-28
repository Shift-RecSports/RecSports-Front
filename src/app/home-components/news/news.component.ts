import { Component } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  newsArray = [
    { title: 'Borregos MTY vs. Borregos QTO', date: '03 - 10 - 2023   10:00', place: 'Estadio Banorte' },
    { title: 'Dua Lipa: World Tour', date: '16 - 04 - 2024   20:00', place: 'Estadio Banorte' },
  ];
}