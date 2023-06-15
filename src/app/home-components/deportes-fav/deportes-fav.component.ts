import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ApiService } from '../../service/api.service';
import { Deporte } from '../../classes/deportes';
@Component({
  selector: 'app-deportes-fav',
  templateUrl: './deportes-fav.component.html',
  styleUrls: ['./deportes-fav.component.css'],
})
export class DeportesFavComponent {
  showAgregarButton = false; // Boton para agregar unicamente disponible para ADMIN
  listaDeportes: Deporte[] = []; // Lista de deportes para mostrar como favoritos
  showedDeportes: Deporte[] = []; // Deportes mostradros en el componente

  constructor(
    private service: AuthService,
    private router: Router,
    private _apiService: ApiService
  ) {
    // Si el usuario es Admin, se muestra le boton para agregar
    if (this.service.isLoggedIn() && this.service.GetUserRole() == 'ADMIN') {
      this.showAgregarButton = true;
    }
  }

  // Al iniciar la pagina, se ejecuta el GET para obtener los deportes favoritos
  ngOnInit() {
    const url = '/deportes/favoritos/6';
    this._apiService.get(url).subscribe((data) => {
      this.listaDeportes = data;
      for (let i = 0; i < this.listaDeportes.length; i++) {
        this.listaDeportes[i].imagen = this._apiService.getImage(
          '/deportes',
          this.listaDeportes[i].imagen
        );
      }
      this.showedDeportes = this.listaDeportes;
    });
  }

  searchTerm(term: string) {
    this.showedDeportes = this.listaDeportes.filter((deporte) => {
      const name = deporte.nombre
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      return name.includes(term.toUpperCase());
    });
  }

  // Al seleccionar un deporte, se redirige al usuario a dicho deporte
  onSelectDeporte(deportedId: Deporte) {
    this.router.navigate([`/deportes/${deportedId.id}`]);
  }

  // Muestra una iamgen defaul cuando ocurre un error al mostrar la iamgen
  handleImageError(event: any) {
    event.target.src =
      'https://athletic-recsports.onrender.com/deportes/1685979403520-848247187.jpg';
  }
}
