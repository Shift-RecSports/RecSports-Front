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

// Interfaz para la creacion de una nueva reservacion
interface newHorarioReservacion {
  disabled: boolean;
  id: string;
  matricula_alumno: string | null;
  zona: string;
  deporte_nombre: string;
  espacio: string;
  espacio_nombre: string;
  estatus: number;
  fecha: string;
  hora_seleccionada:
    | '06:00:00'
    | '07:00:00'
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
    | '21:00:00'
    | '22:00:00';
}

// Horarios disponibes para reservaciones
type MyType = {
  '06:00:00': newHorarioReservacion[];
  '07:00:00': newHorarioReservacion[];
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
  '22:00:00': newHorarioReservacion[];
};

// Arreglo de Horarios disponibles para mostrar en la tabla de reservaciones
type arrOfHorarios =
  | '06:00:00'
  | '07:00:00'
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
  | '21:00:00'
  | '22:00:00';

@Component({
  selector: 'app-deporte-seleccionado',
  templateUrl: './deporte-seleccionado.component.html',
  styleUrls: ['./deporte-seleccionado.component.css'],
})
export class DeporteSeleccionadoComponent {
  // Routing
  private sub: any;
  private sub2: any;
  deporte: Deporte; // Informacion del deporte seleccionado

  listaEspacios: Espacio[] = []; // Lista de espacios disponibles para el espacio
  url: string = '';

  displayedColumns: string[] = ['demo-position', 'demo-name'];

  horariosDisponibles: newHorarioReservacion[] = []; // Arreglo de Reservervaciones (horario) por cada Hora
  arrayReservacion: MyType = {
    '06:00:00': [],
    '07:00:00': [],
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
    '22:00:00': [],
  };

  dataSource: arrOfHorarios[] = []; // Reservaciones mostradas en la tabla de reservaciones

  showEditButton = false; // Bandera para mostrar el boton de edicion, unicamente para ADMIN
  showAddEspacio = false; // Bandera para mostrar el boton de anadir espacio, unicamente para ADMIN
  showAllReservaciones = false; // Bandera para mostrar todas las reservaciones con cualquier estatus, unicamente para ADMIN
  showDeleteEspacio = false; // Bandera para mostrar el boton para borrar un espacio

  selectedDay: number = 5; // Dia de la semana seleccionado para mostrar las reservaciones disponibles
  todayDay: number = 0; // Dia actual
  daySelected: string = ''; // Dia seleccionado
  daysOfTheWeek: Date[] = []; // Dia de la Semana en formato DATE
  todayDate: Date = new Date(); // Dia actual en formato DATE
  daysOfTheWeekInString = [
    // String de dia para mostrar en la UI
    'Dom.',
    'Lun.',
    'Mar.',
    'Mie.',
    'Jue.',
    'Vie.',
    'Sab.',
  ];

  currentBreakpoint: string = ''; // Breakpoint para detectar si la vista es movil o de orderandor
  panelOpenState = false;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.XSmall)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private service: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private _apiService: ApiService
  ) {
    // Si el usuario es tipo ADMIN, entonces activa las banderas
    if (this.service.isLoggedIn() && this.service.GetUserRole() == 'ADMIN') {
      this.showEditButton = true;
      this.showAddEspacio = true;
      this.showAllReservaciones = true;
      this.showDeleteEspacio = true;
    }
  }

  // Al iniciar la pagina, se realiza la peticion para obtener la informacion del deporte seleccionado
  ngOnInit() {
    const today = new Date();
    this.daySelected = this.DateToString(today);
    this.initializeDate(today);

    // Informacion del Deporte
    this.sub = this.route.params.subscribe((params) => {
      const url = `/deportes/${params['id']}`;
      this._apiService.get(url).subscribe((data) => {
        this.deporte = data;
        this.deporte.imagen = this._apiService.getImage(
          '/deportes',
          this.deporte.imagen
        );

        // Espacios disponbibles para el DDeporte
        this.url = `/espacios/deporte/${params['id']}`;
        this._apiService.get(this.url).subscribe((data) => {
          this.listaEspacios = data;

          // Se almacena la informacion de los espacio en el arreglo listaEspacios
          for (let i = 0; i < this.listaEspacios.length; i++) {
            this.listaEspacios[i].imagen = this._apiService.getImage(
              '/espacios',
              this.listaEspacios[i].imagen
            );
          }
          console.log(this.listaEspacios);
        });
      });
    });

    // Peticion a la API para obtener las reservaciones disponibles para el deporte
    this.sub2 = this.route.params.subscribe((params) => {
      const url = `/reservaciones/deporte=${params['id']}/fecha=${this.daySelected}`;

      this._apiService.get(url).subscribe((data) => {
        this.horariosDisponibles = data;

        // Si la bandera esta activa, entonces se muestran todas las reservaciones para ADMIN
        if (this.showAllReservaciones) {
          this.horariosDisponibles.forEach((reservacion) => {
            console.log(reservacion);
            this.arrayReservacion[reservacion.hora_seleccionada].push(
              reservacion
            );
          });

          // Si la bandera no esta activa, entonces solo se muestran las reservaciones con estatus libre para el ALUMNO
        } else {
          this.horariosDisponibles.forEach((reservacion) => {
            if (reservacion.estatus == 1) {
              this.arrayReservacion[reservacion.hora_seleccionada].push(
                reservacion
              );
            }
          });
        }

        // Se almcenan las reservaciones en el dataSource para mostrar en la tabla
        this.dataSource = Object.keys(this.arrayReservacion) as arrOfHorarios[];
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }

  // Se inicializa la informacion del dia
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

  // Funcion para cambiar el Date a un string para desplegar al usuario
  DateToString(day: Date = new Date()) {
    const DateString = `${day.getFullYear()}-${
      day.getMonth() + 1 < 10 ? `0${day.getMonth() + 1}` : day.getMonth() + 1
    }-${day.getDate() < 10 ? `0${day.getDate()}` : day.getDate()}`;

    return DateString;
  }

  // Al seleccionar un dia se realiza la peticion de reserrvaciones para el dia seleccionado y se actualiza la informacion en la tabla
  onSelectDay(day: number) {
    this.selectedDay = day;
    this.daySelected = this.DateToString(this.daysOfTheWeek[this.selectedDay]);
    this.sub2.unsubscribe();

    this.arrayReservacion = {
      '06:00:00': [],
      '07:00:00': [],
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
      '22:00:00': [],
    };

    this.sub2 = this.route.params.subscribe((params) => {
      const url = `/reservaciones/deporte=${params['id']}/fecha=${this.daySelected}`;
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
            if (reservacion.estatus == 1) {
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

  // Funcion para activar el modal de Reservacion
  openDialog(reservacion: newHorarioReservacion): void {
    const dialogRef = this.dialog.open(ModalReservacionComponent, {
      data: { reservacion: reservacion, refreshDay: this.onSelectDay },
    });
  }

  // Funcion para Activar el modal de Borrar un espacio
  openDeleteEspacio(espacio: Espacio): void {
    const dialogRef = this.dialog.open(ModalBorrarEspacioComponent, {
      data: { espacio: espacio },
    });
  }

  // Funcion para redirigir al usuarrio a la pagina de editar un deporte
  onEditDeporte(deportedId: Deporte) {
    this.router.navigate([`/editar-deporte/${deportedId.id}`]);
  }

  // Funcion para redirigir al usuarrio a la pagina de editar un espacio
  onEditEspacio(espacioId: Espacio) {
    this.router.navigate([`/editar-espacio/${espacioId.id}`]);
  }

  // Funcion para redirigir al usuarrio a la pagina de crear un deporte
  onCrearEspacio() {
    this.router.navigate(['/espacios/nuevo']);
  }
}
