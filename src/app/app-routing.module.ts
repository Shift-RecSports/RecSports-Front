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
import { HomeEntrenadorComponent } from './home-entrenador/home-entrenador.component';
import { EncuestasAdminComponent } from './encuesta/encuestas-admin/encuestas-admin.component';
import { NuevaNoticiaComponent } from './noticias/nueva-noticia/nueva-noticia.component';
import { CredencialComponent } from './credencial/credencial.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'gimnasio',
    component: GimnasioComponent,
  },
  {
    path: 'gimnasio/entrada',
    component: RegistroEntradaComponent,
  },
  {
    path: 'gimnasio/salida',
    component: RegistroSalidaComponent,
  },
  {
    path: 'deportes',
    component: DeportesComponent,
  },
  {
    path: 'deportes/:id',
    component: DeporteSeleccionadoComponent,
  },
  {
    path: 'deporte/nuevo',
    component: NuevoDeporteComponent,
  },
  {
    path: 'espacios/nuevo',
    component: EspaciosFormularioComponent,
  },
  {
    path: 'reservaciones',
    component: ReservacionesComponent,
  },
  {
    path: 'credencial',
    component: CredencialComponent,
  },
  // {
  //   path: 'calendario',
  //   component: CalendarioComponent,
  //
  // },
  {
    path: 'noticias',
    component: NoticiasComponent,
  },
  {
    path: 'mapa',
    component: MapaComponent,
  },
  {
    path: 'encuesta',
    component: EncuestaComponent,
  },
  {
    path: 'encuesta-admin',
    component: EncuestasAdminComponent,
  },
  {
    path: 'home-entrenador',
    component: HomeEntrenadorComponent,
  },
  {
    path: 'formulario-noticia',
    component: NuevaNoticiaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
