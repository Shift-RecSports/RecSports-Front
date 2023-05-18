import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { user, navbarFlags } from '../service/types';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  user: user;
  userName: string;
  navbarFlags: navbarFlags;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private service: AuthService,
    private router: Router
  ) {
    this.user = { matricula: '', userRole: '' };
    this.navbarFlags = defaultNavbarFlags;
    this.userName = '';

    if (this.service.isLoggedIn()) {
      this.user = {
        matricula: this.service.GetUserName() ? this.service.GetUserName() : '',
        userRole: this.service.GetUserRole(),
      };

      this.userName = this.user.matricula!;
      // if (this.user.userRole == 'ALUMNO') {
      //   this.userName = 'Sasha Morosov';
      // } else if (this.user.userRole == 'ADMIN') {
      //   this.userName = 'Admin';
      // } else {
      //   this.userName = 'Entrenador';
      // }

      // Activate/Disactivate Navbar components
      this.navbarFlags = activateNavbarFlags(
        this.user.userRole ? this.user.userRole : '',
        defaultNavbarFlags
      );

      // console.log(this.navbarFlags);
    }
  }

  onLogOut() {
    this.router.navigate(['']);
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
};

function activateNavbarFlags(userRole: string, navbarFlags: navbarFlags) {
  if (userRole == 'ADMIN') {
    navbarFlags.inicioFlag = true;
    navbarFlags.gimnasioFlag = true;
    navbarFlags.deportesFlag = true;
    navbarFlags.calendarioFlag = false;
    navbarFlags.noticasFlag = true;
    navbarFlags.mapaFlag = true;
    navbarFlags.encuestaFlag = false;
    navbarFlags.encuestaAdminFlag = true;
    navbarFlags.entradaFlag = false;
    navbarFlags.salidaFlag = false;
  } else if (userRole == 'ENTRENADOR') {
    navbarFlags.inicioFlag = true;
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
