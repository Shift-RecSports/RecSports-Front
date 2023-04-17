import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deportes',
  templateUrl: './deportes.component.html',
  styleUrls: ['./deportes.component.css'],
})
export class DeportesComponent {
  constructor(private router: Router) {}

  onSelectDeporte() {
    this.router.navigate(['/deportes/futbol']);
  }
}
