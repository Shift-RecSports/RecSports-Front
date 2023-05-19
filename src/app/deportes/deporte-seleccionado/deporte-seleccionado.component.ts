import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalReservacionComponent } from './modal-reservacion/modal-reservacion.component';
import { ApiService } from 'src/app/service/api.service';
import { Deporte } from 'src/app/classes/deportes';
import { Espacio } from 'src/app/classes/espacios';
import { ModalBorrarEspacioComponent } from './modal-borrar-espacio/modal-borrar-espacio.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, tap } from 'rxjs/operators';

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

  listaEspacios: Espacio[] = [];
  url: string = '';

  displayedColumns: string[] = ['demo-position', 'demo-name'];

  horariosDisponibles: newHorarioReservacion[] = [];
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
  showAllReservaciones = false;
  showDeleteEspacio = false;

  selectedDay: number = 5;
  todayDay: number = 0;
  daySelected: string = '';
  daysOfTheWeek: Date[] = [];
  todayDate: Date = new Date();
  daysOfTheWeekInString = [
    'Dom.',
    'Lun.',
    'Mar.',
    'Mie.',
    'Jue.',
    'Vie.',
    'Sab.',
  ];

  currentBreakpoint: string = '';
  breakpointLarge = Breakpoints.Large;
  breakpointMedium = Breakpoints.Medium;
  breakpointSmall = Breakpoints.Small;
  breakpointXSmall = Breakpoints.XSmall;
  readonly breakpoint$ = this.breakpointObserver
    .observe([
      Breakpoints.Large,
      Breakpoints.Medium,
      Breakpoints.Small,
      '(min-width: 500px)',
    ])
    .pipe(
      tap((value) => console.log(value)),
      distinctUntilChanged()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private service: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private _apiService: ApiService
  ) {
    if (this.service.isLoggedIn() && this.service.GetUserRole() == 'ADMIN') {
      this.showEditButton = true;
      this.showAddEspacio = true;
      this.showAllReservaciones = true;
      this.showDeleteEspacio = true;
    }
  }

  ngOnInit() {
    const today = new Date();
    this.daySelected = this.DateToString(today);
    this.initializeDate(today);

    this.sub = this.route.params.subscribe((params) => {
      const url = `/deportes/${params['id']}`;
      this._apiService.get(url).subscribe((data) => {
        this.deporte = data;

        this.url = `/espacios/deporte=${params['id']}`;
        this._apiService.get(this.url).subscribe((data) => {
          this.listaEspacios = data;
        });
      });
    });

    this.sub2 = this.route.params.subscribe((params) => {
      const url = `/reservaciones/deporte=${params['id']}&fecha=${this.daySelected}`;

      this._apiService.get(url).subscribe((data) => {
        this.horariosDisponibles = data;

        if (this.showAllReservaciones) {
          this.horariosDisponibles.forEach((reservacion) => {
            this.arrayReservacion[reservacion.hora_seleccionada].push(
              reservacion
            );
          });
        } else {
          this.horariosDisponibles.forEach((reservacion) => {
            if (reservacion.estatus == '1') {
              this.arrayReservacion[reservacion.hora_seleccionada].push(
                reservacion
              );
            }
          });
        }

        this.dataSource = Object.keys(this.arrayReservacion) as arrOfHorarios[];
      });
    });

    this.breakpoint$.subscribe(() => this.breakpointChanged());
  }

  private breakpointChanged() {
    if (this.breakpointObserver.isMatched(Breakpoints.Large)) {
      this.currentBreakpoint = Breakpoints.Large;
    } else if (this.breakpointObserver.isMatched(Breakpoints.Medium)) {
      this.currentBreakpoint = Breakpoints.Medium;
    } else if (this.breakpointObserver.isMatched(Breakpoints.Small)) {
      this.currentBreakpoint = Breakpoints.Small;
    } else if (this.breakpointObserver.isMatched('(min-width: 500px)')) {
      this.currentBreakpoint = '(min-width: 500px)';
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }

  initializeDate(day: Date = new Date()) {
    this.todayDate = day;
    this.todayDay = day.getDay();
    this.selectedDay = day.getDay();

    this.daysOfTheWeek = [
      new Date(day.setDate(day.getDate() - day.getDay())),
      new Date(day.setDate(day.getDate() - day.getDay() + 1)),
      new Date(day.setDate(day.getDate() - day.getDay() + 2)),
      new Date(day.setDate(day.getDate() - day.getDay() + 3)),
      new Date(day.setDate(day.getDate() - day.getDay() + 4)),
      new Date(day.setDate(day.getDate() - day.getDay() + 5)),
      new Date(day.setDate(day.getDate() - day.getDay() + 6)),
    ];
  }

  DateToString(day: Date = new Date()) {
    const DateString = `${day.getFullYear()}-${
      day.getMonth() + 1 < 10 ? `0${day.getMonth() + 1}` : day.getMonth() + 1
    }-${day.getDate() < 10 ? `0${day.getDate()}` : day.getDate()}`;

    return DateString;
  }

  onSelectDay(day: number) {
    this.selectedDay = day;
    this.daySelected = this.DateToString(this.daysOfTheWeek[this.selectedDay]);
    this.sub2.unsubscribe();

    this.arrayReservacion = {
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

    this.sub2 = this.route.params.subscribe((params) => {
      const url = `/reservaciones/deporte=${params['id']}&fecha=${this.daySelected}`;
      this._apiService.get(url).subscribe((data) => {
        this.horariosDisponibles = data;

        if (this.showAllReservaciones) {
          this.horariosDisponibles.forEach((reservacion) => {
            this.arrayReservacion[reservacion.hora_seleccionada].push(
              reservacion
            );
          });
        } else {
          this.horariosDisponibles.forEach((reservacion) => {
            if (reservacion.estatus == '1') {
              this.arrayReservacion[reservacion.hora_seleccionada].push(
                reservacion
              );
            }
          });
        }

        this.dataSource = Object.keys(this.arrayReservacion) as arrOfHorarios[];
      });
    });
  }

  openDialog(reservacion: newHorarioReservacion): void {
    const dialogRef = this.dialog.open(ModalReservacionComponent, {
      data: { reservacion: reservacion, refreshDay: this.onSelectDay },
    });
  }

  openDeleteEspacio(espacio: Espacio): void {
    const dialogRef = this.dialog.open(ModalBorrarEspacioComponent, {
      data: { espacio: espacio },
    });
  }

  onEditDeporte() {
    this.router.navigate(['/deportes/nuevo']);
  }

  onCrearEspacio() {
    this.router.navigate(['/espacios/nuevo']);
  }
}
