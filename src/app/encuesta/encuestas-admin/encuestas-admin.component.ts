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
    new RespuestaEncuesta('1', '23/05/2023', 5, 'Gimnasio', 'Good job!'),
    new RespuestaEncuesta('2', '23/05/2023', 7, 'Wellness Center', 'Could be better.'),
    new RespuestaEncuesta('3', '23/05/2023', 9, 'Gimnasio', 'Excellent work!'),
    new RespuestaEncuesta('4', '23/05/2023', 8, 'Athletics Web', 'Needs improvement.'),
    new RespuestaEncuesta('5', '23/05/2023', 3, 'Gimnasio', 'Average performance.'),
    new RespuestaEncuesta('6', '23/05/2023', 2, 'Wellness Center', 'Average performance.'),
    new RespuestaEncuesta('7', '23/05/2023', 5, 'Wellness Center', 'Average performance.'),
    new RespuestaEncuesta('8', '23/05/2023', 10, 'Athletics Web', 'Average performance.'),
  ];
}
