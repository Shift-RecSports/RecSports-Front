import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { User, navbarFlags } from '../service/types';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  user: User; // Usuario, matricula y rol
  userName: string; // String que se mostrara en la barra del perfil
  navbarFlags: navbarFlags; // Banderas para activar/desactivar opciones de la barra de navegacion dependiendo del tipo de usuario

  showSidebar: boolean = false; // booleano para activar/desactivar la barra de navegacion vertica;
  manualInfoURL: string = ''; // URL del manual de usuario
  videoInfoURL: string = ''; // URL del video explicativo

  showCredencial: boolean = false; // Bandera para activar/desactivar la opcion de ver credencial
  showMisReservaciones: boolean = false; // Bandera para activar/desactivar la opcion de ver mis reservaciones

  // Variable para reconocer el tipo de dispositivo (movil o ordenador)
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.XSmall)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  @ViewChild('drawer', { static: true }) public drawer!: MatDrawer;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private service: AuthService,
    private router: Router
  ) {
    this.user = { matricula: '', nombre: '', userRole: '' };
    this.navbarFlags = defaultNavbarFlags;
    this.userName = '';

    // Se valida si el usuario ha iniciado sesiion para asingarle las credenciales
    if (this.service.isLoggedIn()) {
      this.user = {
        matricula: this.service.GetUserName() ? this.service.GetUserName() : '',
        userRole: this.service.GetUserRole(),
        nombre: this.service.GetUserNameString(),
      };
      this.userName = this.user.nombre!;

      // Se activan y desactivan banderas para la opciones de navegacion
      this.navbarFlags = activateNavbarFlags(
        this.user.userRole ? this.user.userRole : '',
        defaultNavbarFlags
      );

      // Dependiendo del usuario se muestra el manual de usuario y video explicativo referente
      if (this.user.userRole == 'ADMIN') {
        this.manualInfoURL =
          'https://docs.google.com/document/d/1QhRuK7uoxAu9ECZ9SM6jZRFdXIxeE-VgeY7EPU91NRA/edit?usp=sharing';
        this.videoInfoURL = 'https://youtu.be/T__rGb9PFXk';

        this.showCredencial = false;
        this.showMisReservaciones = true;
      } else if (this.user.userRole == 'GIMNASIO') {
        this.manualInfoURL =
          'https://docs.google.com/document/d/1QhRuK7uoxAu9ECZ9SM6jZRFdXIxeE-VgeY7EPU91NRA/edit?usp=sharing';
        this.videoInfoURL = 'https://youtu.be/NnPm2KZJ1_o';

        this.showCredencial = false;
        this.showMisReservaciones = false;
      } else {
        this.manualInfoURL =
          'https://docs.google.com/document/d/1QhRuK7uoxAu9ECZ9SM6jZRFdXIxeE-VgeY7EPU91NRA/edit?usp=sharing';
        this.videoInfoURL = 'https://youtu.be/S3PKN9BCrAI';

        this.showCredencial = true;
        this.showMisReservaciones = true;
      }
    }
  }

  // Abre/Cierra la barra de navegacion
  openSidebar(open: boolean) {
    this.showSidebar = open;
    this.drawer.toggle(this.showSidebar);
    this.showSidebar = this.drawer.opened;
  }

  // Funcion para cerrar sesion
  onLogOut() {
    this.router.navigate(['login']);
  }

  // Funcion para navegar al apartado "credencial"
  onCredencial() {
    this.router.navigate(['credencial']);
  }

  // Funcion para navegar al apartado "reservaciones"
  onMisReservaciones() {
    this.router.navigate(['reservaciones']);
  }
}

// Se inicializan las banderas para las ocpiones de la barra de navegacion
const defaultNavbarFlags = {
  inicioFlag: false,
  gimnasioFlag: false,
  deportesFlag: false,
  calendarioFlag: false,
  noticasFlag: false,
  mapaFlag: false,
  encuestaFlag: false,
  entradaFlag: false,
  salidaFlag: false,
  encuestaAdminFlag: false,
  inicioEntrenadorFlag: false,
};

// Funcion para activar las banderas con las opciones de la barra de nagevacion dependiendo del tipo de usuario
function activateNavbarFlags(userRole: string, navbarFlags: navbarFlags) {
  if (userRole == 'ADMIN') {
    navbarFlags.inicioFlag = true;
    navbarFlags.inicioEntrenadorFlag = false;
    navbarFlags.gimnasioFlag = true;
    navbarFlags.deportesFlag = true;
    navbarFlags.calendarioFlag = false;
    navbarFlags.noticasFlag = true;
    navbarFlags.mapaFlag = true;
    navbarFlags.encuestaFlag = false;
    navbarFlags.encuestaAdminFlag = true;
    navbarFlags.entradaFlag = false;
    navbarFlags.salidaFlag = false;
  } else if (userRole == 'GIMNASIO') {
    navbarFlags.inicioFlag = false;
    navbarFlags.inicioEntrenadorFlag = true;
    navbarFlags.gimnasioFlag = true;
    navbarFlags.deportesFlag = false;
    navbarFlags.calendarioFlag = false;
    navbarFlags.noticasFlag = false;
    navbarFlags.mapaFlag = false;
    navbarFlags.encuestaFlag = false;
    navbarFlags.encuestaAdminFlag = false;
    navbarFlags.entradaFlag = true;
    navbarFlags.salidaFlag = true;
  } else {
    navbarFlags.inicioFlag = true;
    navbarFlags.gimnasioFlag = false;
    navbarFlags.deportesFlag = true;
    navbarFlags.calendarioFlag = false;
    navbarFlags.noticasFlag = false;
    navbarFlags.mapaFlag = true;
    navbarFlags.encuestaFlag = true;
    navbarFlags.encuestaAdminFlag = false;
    navbarFlags.entradaFlag = false;
    navbarFlags.salidaFlag = false;
  }

  return navbarFlags;
}
