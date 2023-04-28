import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ApiService } from '../service/api.service';
import { DeporteItem } from '../classes/deportes';

@Component({
  selector: 'app-deportes',
  templateUrl: './deportes.component.html',
  styleUrls: ['./deportes.component.css'],
})
export class DeportesComponent {
  showAgregarButton = false;
  listaDeportes: DeporteItem[];

  constructor(
    private service: AuthService,
    private router: Router,
    private _apiService: ApiService
  ) {
    if (this.service.isLoggedIn() && this.service.GetUserRole() == 'ADMIN') {
      this.showAgregarButton = true;
    }
  }

  ngOnInit() {
    const url = '';

    this._apiService.get(url).subscribe((data) => {
      this.listaDeportes = data;
      console.log(data);
    });
  }

  onSelectDeporte() {
    this.router.navigate(['/deportes/futbol']);
  }

  onAgregarDeporte() {
    this.router.navigate(['/deportes/nuevo']);
  }
}
