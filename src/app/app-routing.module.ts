import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarioComponent } from './calendario/calendario.component';
import { DeportesComponent } from './deportes/deportes.component';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { GimnasioComponent } from './gimnasio/gimnasio.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MapaComponent } from './mapa/mapa.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { DeporteSeleccionadoComponent } from './deportes/deporte-seleccionado/deporte-seleccionado.component';
import { ReservacionesComponent } from './reservaciones/reservaciones.component';
import { NuevoDeporteComponent } from './deportes/components/nuevo-deporte/nuevo-deporte.component';
import { EspaciosFormularioComponent } from './deportes/components/espacios-formulario/espacios-formulario.component';
import { RegistroEntradaComponent } from './gimnasio/registro-entrada/registro-entrada.component';
import { RegistroSalidaComponent } from './gimnasio/registro-salida/registro-salida.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'gimnasio',
    component: GimnasioComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'gimnasio/entrada',
    component: RegistroEntradaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'gimnasio/salida',
    component: RegistroSalidaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'deportes',
    component: DeportesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'deportes/futbol',
    component: DeporteSeleccionadoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'deportes/nuevo',
    component: NuevoDeporteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'espacios/nuevo',
    component: EspaciosFormularioComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reservaciones',
    component: ReservacionesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'calendario',
    component: CalendarioComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'noticias',
    component: NoticiasComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'mapa',
    component: MapaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'encuesta',
    component: EncuestaComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
