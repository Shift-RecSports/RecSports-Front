import { Component } from '@angular/core';
import { RespuestaEncuesta } from 'src/app/classes/respuesta-encuesta';

@Component({
  selector: 'app-encuestas-admin',
  templateUrl: './encuestas-admin.component.html',
  styleUrls: ['./encuestas-admin.component.css']
})
export class EncuestasAdminComponent {
  //arreglo para numeros abajo de slider
  tickValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  //valor de promedio de slider hardcodeado
  value = 8

  //arreglo para cards con respuestas previas (hardcodeado)
  respuestas: RespuestaEncuesta[] = [
    new RespuestaEncuesta('1', 5, 'hola', 'Good job!'),
    new RespuestaEncuesta('2', 7, 'muy bueno', 'Could be better.'),
    new RespuestaEncuesta('3', 9, 'excelente', 'Excellent work!'),
    new RespuestaEncuesta('4', 3, 'queja', 'Needs improvement.'),
    new RespuestaEncuesta('5', 6, 'meh', 'Average performance.'),
    new RespuestaEncuesta('5', 2, 'pobre', 'Average performance.'),
    new RespuestaEncuesta('5', 10, 'increible', 'Average performance.'),
    new RespuestaEncuesta('5', 5, 'okay', 'Average performance.'),
  ];
}
