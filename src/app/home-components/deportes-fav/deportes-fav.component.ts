import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-deportes-fav',
  templateUrl: './deportes-fav.component.html',
  styleUrls: ['./deportes-fav.component.css']
})
export class DeportesFavComponent {

  constructor(
    private router: Router) {}

  onSelectFutbol() {
    this.router.navigate(['/deportes/dep002']);
  }

  onSelectBasquetbol() {
    this.router.navigate(['/deportes/dep001']);
  }

  onSelectRapido() {
    this.router.navigate(['/deportes/dep003']);
  }

  onSelectTennis() {
    this.router.navigate(['/deportes/dep004']);
  }

  onSelectNatacion() {
    this.router.navigate(['/deportes/dep005']);
  }

  onSelectYoga() {
    this.router.navigate(['/deportes/dep006']);
  }

  onSelectSpinning() {
    this.router.navigate(['/deportes/dep007']);
  }

}
