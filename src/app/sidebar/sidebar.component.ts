import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { user, navbarFlags } from '../service/types';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  user: user;
  userName: string;
  navbarFlags: navbarFlags;

  showSidebar: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
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

  openSidebar(open: boolean) {
    this.showSidebar = open;
    this.drawer.toggle();
  }

  onLogOut() {
    this.router.navigate(['login']);
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
};

function activateNavbarFlags(userRole: string, navbarFlags: navbarFlags) {
  if (userRole == 'ADMIN') {
    navbarFlags.inicioFlag = true;
    navbarFlags.gimnasioFlag = true;
    navbarFlags.deportesFlag = true;
    navbarFlags.calendarioFlag = false;
    navbarFlags.noticasFlag = true;
    navbarFlags.mapaFlag = true;
    navbarFlags.encuestaFlag = true;
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
    navbarFlags.entradaFlag = false;
    navbarFlags.salidaFlag = false;
  }

  return navbarFlags;
}
