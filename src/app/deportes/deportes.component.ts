import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ApiService } from '../service/api.service';
import { Deporte } from '../classes/deportes';

@Component({
  selector: 'app-deportes',
  templateUrl: './deportes.component.html',
  styleUrls: ['./deportes.component.css'],
})
export class DeportesComponent {
  showAgregarButton = false; // Bandera para mostrar el boton de agregar, unicamente ADMIN tiene esta funcionalidad
  listaDeportes: Deporte[] = []; // Listado de Deportes
  showedDeportes: Deporte[] = []; // Deportes que se muestran en la pantalla

  constructor(
    private service: AuthService,
    private router: Router,
    private _apiService: ApiService
  ) {
    if (this.service.isLoggedIn() && this.service.GetUserRole() == 'ADMIN') {
      this.showAgregarButton = true; // Se activa la bandera para mostrar el boton de Agregar
    }
  }

  // Al iniciar la pagina, se hace la peticion a la API para obtener el listado de deportes
  ngOnInit() {
    const url = '/deportes';
    this._apiService.get(url).subscribe((data) => {
      this.listaDeportes = data;
      for (let i = 0; i < this.listaDeportes.length; i++) {
        this.listaDeportes[i].imagen = this._apiService.getImage(
          '/deportes',
          this.listaDeportes[i].imagen
        );
      }

      // Se agrega el listado de deportes a la variable
      this.showedDeportes = this.listaDeportes;
    });
  }

  // Funcion para filtrar los deportes por un termino de busqueda
  searchTerm(term: string) {
    this.showedDeportes = this.listaDeportes.filter((deporte) => {
      const name = deporte.nombre
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      return name.toUpperCase().includes(term.toUpperCase());
    });
  }

  // Al seleccionar un deporte se redirige a la pantalla del depprte seleccionado
  onSelectDeporte(deportedId: Deporte) {
    this.router.navigate([`/deportes/${deportedId.id}`]);
  }

  // Al seleccionar el boton de Agregar se redirige ala pantalla de Agregar deporte
  onAgregarDeporte() {
    this.router.navigate(['/deporte/nuevo']);
  }
}
