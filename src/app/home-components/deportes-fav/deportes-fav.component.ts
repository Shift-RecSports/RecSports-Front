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

  onSelectDeporte() {
    this.router.navigate(['/deportes/futbol']);
  }

}
