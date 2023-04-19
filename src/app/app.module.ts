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

import { GimnasioComponent } from './gimnasio/gimnasio.component';
import { DeportesComponent } from './deportes/deportes.component';
import { DeporteSeleccionadoComponent } from './deportes/deporte-seleccionado/deporte-seleccionado.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { MapaComponent } from './mapa/mapa.component';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { LoginComponent } from './login/login.component';
import { ReservacionesComponent } from './reservaciones/reservaciones.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './material.module';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { HttpClientModule } from '@angular/common/http';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NuevoDeporteComponent } from './deportes/components/nuevo-deporte/nuevo-deporte.component';

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
    ReservacionesComponent,
    NuevoDeporteComponent,
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
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    HttpClientModule,
    NzGridModule,
    ScrollingModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
