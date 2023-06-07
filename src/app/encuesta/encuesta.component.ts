import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ApiService } from '../service/api.service';
import { User } from '../service/types';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent {
  //arreglo para numeros abajo de slider
  tickValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // Variable para almacenar tema de encuesta
  temaValue: string = '';
  // variable para almacenar mensaje
  textareaValue: string = '';

  // variable para almacenar valor de sliders
  sliderValue1: number = 5;
  sliderValue2: number = 5;
  sliderValue3: number = 5;

  // para guardar matricula
  user: User;

  // si ya subió una encuesta, ya no le aparece info
  contestada: boolean = false;

  constructor(private service: AuthService, private _apiService: ApiService){
    this.user = { matricula: '', nombre: '', userRole: '' };

    if (this.service.isLoggedIn()) {
      this.user = {
        matricula: this.service.GetUserName() ? this.service.GetUserName() : '',
        userRole: this.service.GetUserRole(),
        nombre: this.service.GetUserNameString(),
      };
    }
  }

  // metodo para convertir number a string e usarlo en html
  formatLabel(value: number) {
    return value.toString();
  }

  onSlider1ValueChange(event: any) {
    this.sliderValue1 = event.value;
  }

  onSlider2ValueChange(event: any) {
    this.sliderValue2 = event.value;
  }

  onSlider3ValueChange(event: any) {
    this.sliderValue3 = event.value;
  }

  onEnviarButtonClick() {
    const url = '/encuestas';
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in ISO format
    const body = {
      matricula: this.user.matricula,
      fecha: currentDate,
      calificacion1: this.sliderValue1,
      calificacion2: this.sliderValue2,
      calificacion3: this.sliderValue3,
      tema: this.temaValue,
      comentario: this.textareaValue
    };

    this._apiService.post(url, body).subscribe((data) => {
      this.contestada = true;
    });
  }

}


