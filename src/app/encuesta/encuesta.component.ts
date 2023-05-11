import { Component } from '@angular/core';
import { NzMarks } from 'ng-zorro-antd/slider';


@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent {
  tickValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  formatLabel(value: number): string {
    if (value >= 1000) {
      return value.toString();
    }

    return `${value}`;
  }
}


