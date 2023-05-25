import { Component } from '@angular/core';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent {
  //arreglo para numeros abajo de slider
  tickValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // variable para almacenar valor de slider
  sliderValue: number = 0;
  formatLabel(value: number) {
    return value.toString();
  }
  onSliderChange(event: any) {
    this.sliderValue = event.value; // Assign the slider value to the sliderValue variable
  }

  // Variable para almacenar tema de encuesta
  inputValue: string = '';
  onInputChange(value: string) {
    this.inputValue = value; // Assign the input value to the inputValue variable
  }

  // variable para almacenar mensaje
  textareaValue: string = ''; // Variable to store the textarea value
  onTextareaChange(value: string) {
    this.textareaValue = value; // Assign the textarea value to the textareaValue variable
  }
}


