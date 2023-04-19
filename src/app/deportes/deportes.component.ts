import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-deportes',
  templateUrl: './deportes.component.html',
  styleUrls: ['./deportes.component.css'],
})
export class DeportesComponent {
  showAgregarButton = false;

  constructor(private service: AuthService, private router: Router) {
    if (this.service.isLoggedIn() && this.service.GetUserRole() == 'ADMIN') {
      this.showAgregarButton = true;
    }
  }

  onSelectDeporte() {
    this.router.navigate(['/deportes/futbol']);
  }

  onAgregarDeporte() {
    this.router.navigate(['/deportes/nuevo']);
  }
}
