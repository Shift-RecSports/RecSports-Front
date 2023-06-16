import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Athletics';

  showSidebar: boolean;

  // Booleano para visualizar o no labarra de navegación vertical
  constructor(private router: Router) {
    this.showSidebar = false;
  }

  // Si se encuentra en cualquier página que no sea la de Inicio de Sesión, entonces se muestra la barra de navegación vertical
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.startsWith('/login')) {
          this.showSidebar = false;
        } else {
          this.showSidebar = true;
        }
      }
    });
  }
}
