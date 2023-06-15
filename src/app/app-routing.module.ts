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
import { EditarDeporteComponent } from './deportes/components/editar-deporte/editar-deporte.component';
import { EditarEspacioComponent } from './deportes/components/editar-espacio/editar-espacio.component';

// Definicion de rutas de la pagina
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard], // Incluye authguard: es necesario iniciar sesion previamente para accesar a esta ruta
  },
  {
    path: 'gimnasio',
    component: GimnasioComponent,
    canActivate: [AuthGuard], // Incluye authguard: es necesario iniciar sesion previamente para accesar a esta ruta
  },
  {
    path: 'gimnasio/entrada',
    component: RegistroEntradaComponent,
    canActivate: [AuthGuard], // Incluye authguard: es necesario iniciar sesion previamente para accesar a esta ruta
  },
  {
    path: 'gimnasio/salida',
    component: RegistroSalidaComponent,
    canActivate: [AuthGuard], // Incluye authguard: es necesario iniciar sesion previamente para accesar a esta ruta
  },
  {
    path: 'deportes',
    component: DeportesComponent,
    canActivate: [AuthGuard], // Incluye authguard: es necesario iniciar sesion previamente para accesar a esta ruta
  },
  {
    path: 'deportes/:id',
    component: DeporteSeleccionadoComponent,
    canActivate: [AuthGuard], // Incluye authguard: es necesario iniciar sesion previamente para accesar a esta ruta
  },
  {
    path: 'deporte/nuevo',
    component: NuevoDeporteComponent,
    canActivate: [AuthGuard], // Incluye authguard: es necesario iniciar sesion previamente para accesar a esta ruta
  },
  {
    path: 'editar-deporte/:id',
    component: EditarDeporteComponent,
    canActivate: [AuthGuard], // Incluye authguard: es necesario iniciar sesion previamente para accesar a esta ruta
  },
  {
    path: 'editar-espacio/:id',
    component: EditarEspacioComponent,
    canActivate: [AuthGuard], // Incluye authguard: es necesario iniciar sesion previamente para accesar a esta ruta
  },
  {
    path: 'espacios/nuevo',
    component: EspaciosFormularioComponent,
    canActivate: [AuthGuard], // Incluye authguard: es necesario iniciar sesion previamente para accesar a esta ruta
  },
  {
    path: 'reservaciones',
    component: ReservacionesComponent,
    canActivate: [AuthGuard], // Incluye authguard: es necesario iniciar sesion previamente para accesar a esta ruta
  },
  {
    path: 'credencial',
    component: CredencialComponent,
    canActivate: [AuthGuard], // Incluye authguard: es necesario iniciar sesion previamente para accesar a esta ruta
  },
  {
    path: 'noticias',
    component: NoticiasComponent,
    canActivate: [AuthGuard], // Incluye authguard: es necesario iniciar sesion previamente para accesar a esta ruta
  },
  {
    path: 'mapa',
    component: MapaComponent,
    canActivate: [AuthGuard], // Incluye authguard: es necesario iniciar sesion previamente para accesar a esta ruta
  },
  {
    path: 'encuesta',
    component: EncuestaComponent,
    canActivate: [AuthGuard], // Incluye authguard: es necesario iniciar sesion previamente para accesar a esta ruta
  },
  {
    path: 'encuesta-admin',
    component: EncuestasAdminComponent,
    canActivate: [AuthGuard], // Incluye authguard: es necesario iniciar sesion previamente para accesar a esta ruta
  },
  {
    path: 'home-entrenador',
    component: HomeEntrenadorComponent,
    canActivate: [AuthGuard], // Incluye authguard: es necesario iniciar sesion previamente para accesar a esta ruta
  },
  {
    path: 'formulario-noticia',
    component: NuevaNoticiaComponent,
    canActivate: [AuthGuard], // Incluye authguard: es necesario iniciar sesion previamente para accesar a esta ruta
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
