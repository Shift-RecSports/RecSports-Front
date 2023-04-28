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
import { CalendarioComponent } from './calendario/calendario.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { MapaComponent } from './mapa/mapa.component';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { LoginComponent } from './login/login.component';
import { BarChartComponent } from './home-components/bar-chart/bar-chart.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './material.module';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { HttpClientModule } from '@angular/common/http';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import * as d3 from 'd3';
import en from '@angular/common/locales/en';
import { NewsComponent } from './home-components/news/news.component';

import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { DeportesFavComponent } from './home-components/deportes-fav/deportes-fav.component';



registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    GimnasioComponent,
    DeportesComponent,
    CalendarioComponent,
    NoticiasComponent,
    MapaComponent,
    EncuestaComponent,
    LoginComponent,
    BarChartComponent,
    NewsComponent,
    DeportesFavComponent
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
    BrowserModule, 
    NzCarouselModule,
    NzButtonModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
