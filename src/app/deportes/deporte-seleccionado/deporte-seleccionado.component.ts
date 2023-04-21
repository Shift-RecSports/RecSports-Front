import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

interface HorarioReservacion {
  name: string;
  hora: string;
  repetition: number;
  disabled: boolean;
}

const HORARIOS_RESERVACION: HorarioReservacion[] = [
  { hora: '06:00', name: 'CDB1 | Cancha 2 ', repetition: 1, disabled: true },
  { hora: '07:00', name: 'CDB1 | Cancha 2 ', repetition: 3, disabled: true },
  { hora: '08:00', name: 'CDB1 | Cancha 2 ', repetition: 1, disabled: true },
  { hora: '09:00', name: 'CDB1 | Cancha 2 ', repetition: 2, disabled: true },
  { hora: '10:00', name: 'CDB1 | Cancha 2 ', repetition: 2, disabled: true },
  { hora: '11:00', name: 'CDB1 | Cancha 2 ', repetition: 3, disabled: true },
  { hora: '12:00', name: 'CDB1 | Cancha 2 ', repetition: 1, disabled: false },
  { hora: '13:00', name: 'CDB1 | Cancha 2 ', repetition: 1, disabled: false },
  { hora: '14:00', name: 'CDB1 | Cancha 2 ', repetition: 2, disabled: false },
  { hora: '15:00', name: 'CDB1 | Cancha 2 ', repetition: 1, disabled: false },
  { hora: '16:00', name: 'CDB1 | Cancha 2 ', repetition: 2, disabled: false },
  { hora: '17:00', name: 'CDB1 | Cancha 2 ', repetition: 1, disabled: false },
  { hora: '18:00', name: 'CDB1 | Cancha 2 ', repetition: 1, disabled: false },
  { hora: '19:00', name: 'CDB1 | Cancha 2 ', repetition: 1, disabled: false },
  { hora: '20:00', name: 'CDB1 | Cancha 2 ', repetition: 1, disabled: false },
];

@Component({
  selector: 'app-deporte-seleccionado',
  templateUrl: './deporte-seleccionado.component.html',
  styleUrls: ['./deporte-seleccionado.component.css'],
})
export class DeporteSeleccionadoComponent {
  displayedColumns: string[] = ['demo-position', 'demo-name'];
  dataSource = HORARIOS_RESERVACION;
  showEditButton = false;

  constructor(private service: AuthService, private router: Router) {
    if (this.service.isLoggedIn() && this.service.GetUserRole() == 'ADMIN') {
      this.showEditButton = true;
    }
  }

  onEditDeporte() {
    this.router.navigate(['/deportes/nuevo']);
  }

  onCrearEspacio() {
    this.router.navigate(['/espacios/nuevo']);
  }
}
