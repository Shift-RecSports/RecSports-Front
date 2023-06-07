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
  user: User;
  userName: string;
  navbarFlags: navbarFlags;

  showSidebar: boolean = false;
  manualInfoURL: string = '';

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

    if (this.service.isLoggedIn()) {
      this.user = {
        matricula: this.service.GetUserName() ? this.service.GetUserName() : '',
        userRole: this.service.GetUserRole(),
        nombre: this.service.GetUserNameString(),
      };

      // TODO: Change user name
      this.userName = this.user.nombre!;

      // Activate/Disactivate Navbar components
      this.navbarFlags = activateNavbarFlags(
        this.user.userRole ? this.user.userRole : '',
        defaultNavbarFlags
      );

      if (this.user.userRole == 'ADMIN') {
        this.manualInfoURL = 'https://www.youtube.com/watch?v=v5_SYkFpFiY';
      } else if (this.user.userRole == 'GIMNASIO') {
        this.manualInfoURL = 'https://www.youtube.com/watch?v=b2wQtu9YnWk';
      } else {
        this.manualInfoURL = 'https://www.youtube.com/watch?v=_6HpI5i84w8';
      }
    }
  }

  openSidebar(open: boolean) {
    this.showSidebar = open;
    this.drawer.toggle(this.showSidebar);
    this.showSidebar = this.drawer.opened;
  }

  onLogOut() {
    this.router.navigate(['login']);
  }

  onCredencial() {
    this.router.navigate(['credencial']);
  }

  onMisReservaciones() {
    this.router.navigate(['reservaciones']);
  }
}

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
