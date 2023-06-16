import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private service: AuthService, private router: Router) {}

  // Si el usuario tiene credenciales validas, entonces puede entrar a la pagina seleccionada
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.service.isLoggedIn()) {
      // Si el usuario ha iniciado sesion, entonces puede entrar a la ruta especificada
      return true;
    } else {
      // Si el usuario no ha iniciado sesion y quiere navegar a una ruta, sera redirigido a la pagina de inicio de sesion
      this.router.navigate(['login']);
      return false;
    }
  }
}
