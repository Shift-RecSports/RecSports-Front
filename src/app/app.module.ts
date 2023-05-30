import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './home/home.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { ApiService } from './service/api.service';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { GimnasioComponent } from './gimnasio/gimnasio.component';
import { DeportesComponent } from './deportes/deportes.component';
import { DeporteSeleccionadoComponent } from './deportes/deporte-seleccionado/deporte-seleccionado.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { MapaComponent } from './mapa/mapa.component';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { LoginComponent } from './login/login.component';
import { BarChartComponent } from './home-components/bar-chart/bar-chart.component';
import { ReservacionesComponent } from './reservaciones/reservaciones.component';
import { ModalReservacionComponent } from './deportes/deporte-seleccionado/modal-reservacion/modal-reservacion.component';
import { ModalComponent } from './reservaciones/modal/modal.component';

import { DeportesFavComponent } from './home-components/deportes-fav/deportes-fav.component';
import { NewsComponent } from './home-components/news/news.component';
import { DonutChartComponent } from './home-components/donut-chart/donut-chart.component';

import { RegistroEntradaComponent } from './gimnasio/registro-entrada/registro-entrada.component';
import { RegistroSalidaComponent } from './gimnasio/registro-salida/registro-salida.component';

import { EncuestasAdminComponent } from './encuesta/encuestas-admin/encuestas-admin.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './material.module';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { HttpClientModule } from '@angular/common/http';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NuevoDeporteComponent } from './deportes/components/nuevo-deporte/nuevo-deporte.component';
import { EspaciosFormularioComponent } from './deportes/components/espacios-formulario/espacios-formulario.component';
import { HomeEntrenadorComponent } from './home-entrenador/home-entrenador.component';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';


import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { MatSliderModule } from '@angular/material/slider';
import { NuevaNoticiaComponent } from './noticias/nueva-noticia/nueva-noticia.component';
import { ModalBorrarEspacioComponent } from './deportes/deporte-seleccionado/modal-borrar-espacio/modal-borrar-espacio.component';
import { AuthGuard } from './guard/auth.guard';
import { ModalBorrarNoticiaComponent } from './noticias/modal-borrar-noticia/modal-borrar-noticia.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { CredencialComponent } from './credencial/credencial.component';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    GimnasioComponent,
    DeportesComponent,
    DeporteSeleccionadoComponent,
    CalendarioComponent,
    NoticiasComponent,
    MapaComponent,
    EncuestaComponent,
    LoginComponent,
    BarChartComponent,
    NewsComponent,
    DonutChartComponent,
    DeportesFavComponent,
    ReservacionesComponent,
    NuevoDeporteComponent,
    EspaciosFormularioComponent,
    ModalReservacionComponent,
    RegistroEntradaComponent,
    RegistroSalidaComponent,
    HomeEntrenadorComponent,
    ModalComponent,
    EncuestasAdminComponent,
    NuevaNoticiaComponent,
    ModalBorrarEspacioComponent,
    ModalBorrarNoticiaComponent,
    CredencialComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    HttpClientModule,
    NzGridModule,
    BrowserModule,
    NzCarouselModule,
    NzButtonModule,
    ScrollingModule,
    MatAutocompleteModule,
    MatDialogModule,
    NzProgressModule,
    NzSelectModule,
    NzInputModule,
    MatSliderModule,
    NzTimePickerModule,
    NzDatePickerModule,
    MatDatepickerModule,
    NzAlertModule,
    MatProgressSpinnerModule,
    NzNotificationModule,
    NzTabsModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, ApiService, AuthGuard],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
