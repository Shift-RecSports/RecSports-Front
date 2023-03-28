import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'recsports';

  showSidebar: boolean;

  constructor(private router: Router) {
    this.showSidebar = false;
  }

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
