import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalReservacionComponent } from './modal-reservacion/modal-reservacion.component';
import { ApiService } from 'src/app/service/api.service';
import { Deporte } from 'src/app/classes/deportes';

interface HorarioReservacion {
  name: string;
  hora: string;
  repetition: number;
  disabled: boolean;
}

interface newHorarioReservacion {
  id: string;
  hora_seleccionada:
    | '08:00:00'
    | '09:00:00'
    | '10:00:00'
    | '11:00:00'
    | '12:00:00'
    | '13:00:00'
    | '14:00:00'
    | '15:00:00'
    | '16:00:00'
    | '17:00:00'
    | '18:00:00'
    | '19:00:00'
    | '20:00:00'
    | '21:00:00';
  matricula_alumno: string | null;
  fecha: string;
  espacio: string;
  estatus: string;
  zona: string;
  espacio_nombre: string;
  disabled: boolean;
}

// interface HorarioReservacion {
//   espacio: string;
//   zona: string;
//   hora: string;
//   estatusReserva: string;
//   matricula: string;
// }

type MyType = {
  '08:00:00': newHorarioReservacion[];
  '09:00:00': newHorarioReservacion[];
  '10:00:00': newHorarioReservacion[];
  '11:00:00': newHorarioReservacion[];
  '12:00:00': newHorarioReservacion[];
  '13:00:00': newHorarioReservacion[];
  '14:00:00': newHorarioReservacion[];
  '15:00:00': newHorarioReservacion[];
  '16:00:00': newHorarioReservacion[];
  '17:00:00': newHorarioReservacion[];
  '18:00:00': newHorarioReservacion[];
  '19:00:00': newHorarioReservacion[];
  '20:00:00': newHorarioReservacion[];
  '21:00:00': newHorarioReservacion[];
};

type arrOfHorarios =
  | '08:00:00'
  | '09:00:00'
  | '10:00:00'
  | '11:00:00'
  | '12:00:00'
  | '13:00:00'
  | '14:00:00'
  | '15:00:00'
  | '16:00:00'
  | '17:00:00'
  | '18:00:00'
  | '19:00:00'
  | '20:00:00'
  | '21:00:00';

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

const HORARIOS_RESERVACION_2: HorarioReservacion[] = [
  { hora: '06:00', name: 'CDB1 | Cancha 1 ', repetition: 2, disabled: true },
  { hora: '07:00', name: 'CDB1 | Cancha 1 ', repetition: 1, disabled: true },
  { hora: '08:00', name: 'CDB1 | Cancha 1 ', repetition: 3, disabled: true },
  { hora: '09:00', name: 'CDB1 | Cancha 1 ', repetition: 1, disabled: true },
  { hora: '10:00', name: 'CDB1 | Cancha 1 ', repetition: 3, disabled: true },
  { hora: '11:00', name: 'CDB1 | Cancha 1 ', repetition: 2, disabled: true },
  { hora: '12:00', name: 'CDB1 | Cancha 1 ', repetition: 2, disabled: false },
  { hora: '13:00', name: 'CDB1 | Cancha 1 ', repetition: 3, disabled: false },
  { hora: '14:00', name: 'CDB1 | Cancha 1 ', repetition: 1, disabled: false },
  { hora: '15:00', name: 'CDB1 | Cancha 1 ', repetition: 2, disabled: false },
  { hora: '16:00', name: 'CDB1 | Cancha 1 ', repetition: 1, disabled: false },
  { hora: '17:00', name: 'CDB1 | Cancha 1 ', repetition: 2, disabled: false },
  { hora: '18:00', name: 'CDB1 | Cancha 1 ', repetition: 2, disabled: false },
  { hora: '19:00', name: 'CDB1 | Cancha 1 ', repetition: 1, disabled: false },
  { hora: '20:00', name: 'CDB1 | Cancha 1 ', repetition: 1, disabled: false },
];

const HORARIOS_RESERVACION_3: HorarioReservacion[] = [
  { hora: '06:00', name: 'CDB1 | Cancha 3 ', repetition: 3, disabled: true },
  { hora: '07:00', name: 'CDB1 | Cancha 3 ', repetition: 3, disabled: true },
  { hora: '08:00', name: 'CDB1 | Cancha 3 ', repetition: 1, disabled: true },
  { hora: '09:00', name: 'CDB1 | Cancha 3 ', repetition: 2, disabled: true },
  { hora: '10:00', name: 'CDB1 | Cancha 3 ', repetition: 2, disabled: true },
  { hora: '11:00', name: 'CDB1 | Cancha 3 ', repetition: 1, disabled: true },
  { hora: '12:00', name: 'CDB1 | Cancha 3 ', repetition: 3, disabled: false },
  { hora: '13:00', name: 'CDB1 | Cancha 3 ', repetition: 1, disabled: false },
  { hora: '14:00', name: 'CDB1 | Cancha 3 ', repetition: 2, disabled: false },
  { hora: '15:00', name: 'CDB1 | Cancha 3 ', repetition: 3, disabled: false },
  { hora: '16:00', name: 'CDB1 | Cancha 3 ', repetition: 3, disabled: false },
  { hora: '17:00', name: 'CDB1 | Cancha 3 ', repetition: 1, disabled: false },
  { hora: '18:00', name: 'CDB1 | Cancha 3 ', repetition: 1, disabled: false },
  { hora: '19:00', name: 'CDB1 | Cancha 3 ', repetition: 1, disabled: false },
  { hora: '20:00', name: 'CDB1 | Cancha 3 ', repetition: 1, disabled: false },
];

@Component({
  selector: 'app-deporte-seleccionado',
  templateUrl: './deporte-seleccionado.component.html',
  styleUrls: ['./deporte-seleccionado.component.css'],
})
export class DeporteSeleccionadoComponent {
  // Routing
  private sub: any;
  private sub2: any;
  deporte: Deporte;

  displayedColumns: string[] = ['demo-position', 'demo-name'];

  horariosDisponibles: newHorarioReservacion[];
  arrayReservacion: MyType = {
    '08:00:00': [],
    '09:00:00': [],
    '10:00:00': [],
    '11:00:00': [],
    '12:00:00': [],
    '13:00:00': [],
    '14:00:00': [],
    '15:00:00': [],
    '16:00:00': [],
    '17:00:00': [],
    '18:00:00': [],
    '19:00:00': [],
    '20:00:00': [],
    '21:00:00': [],
  };

  dataSource: arrOfHorarios[] = [];

  showEditButton = false;
  showAddEspacio = false;

  selectedDay = 5;
  selectedReservacion = {
    hora: '06:00',
    area: 'CBD1',
    espacio: 'Cancha 1',
  };

  constructor(
    private service: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private _apiService: ApiService
  ) {
    if (this.service.isLoggedIn() && this.service.GetUserRole() == 'ADMIN') {
      this.showEditButton = true;
      this.showAddEspacio = true;
    }
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      const url = `/deportes/${params['id']}`;
      this._apiService.get(url).subscribe((data) => {
        this.deporte = data;
      });
    });

    this.sub2 = this.route.params.subscribe((params) => {
      const url = `/reservaciones/deporte=${params['id']}&fecha=2023-05-05`;
      this._apiService.get(url).subscribe((data) => {
        this.horariosDisponibles = data;

        this.horariosDisponibles.forEach((reservacion) => {
          if (
            this.arrayReservacion[reservacion.hora_seleccionada].length < 4 &&
            reservacion.estatus == '1'
          ) {
            this.arrayReservacion[reservacion.hora_seleccionada].push(
              reservacion
            );
          }
        });

        this.dataSource = Object.keys(this.arrayReservacion) as arrOfHorarios[];
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSelectDay(day: number) {
    this.selectedDay = day;
    console.log(day);
    // if (this.selectedDay % 3 == 2) {
    //   this.dataSource = HORARIOS_RESERVACION;
    // } else if (this.selectedDay % 3 == 1) {
    //   this.dataSource = HORARIOS_RESERVACION_2;
    // } else {
    //   this.dataSource = HORARIOS_RESERVACION_3;
    // }
  }

  openDialog(reservacion: newHorarioReservacion): void {
    const dialogRef = this.dialog.open(ModalReservacionComponent, {
      data: { reservacion: reservacion },
    });
  }

  onEditDeporte() {
    this.router.navigate(['/deportes/nuevo']);
  }

  onCrearEspacio() {
    this.router.navigate(['/espacios/nuevo']);
  }
}
