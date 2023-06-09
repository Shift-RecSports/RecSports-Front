import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { timeParse } from 'd3-time-format';
import * as moment from 'moment';
import { ConcurrenciaGimnasio } from 'src/app/classes/aforos';
import { ApiService } from 'src/app/service/api.service';
import { Subscription, switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit {
  timerSubscription: Subscription; // Subscripcion de tiempo para recargar la grafica de aforo actual

  constructor(private _apiService: ApiService) {}

  data: ConcurrenciaGimnasio[] = []; // Datos de concurrencias del gimnasio para mostrar en la grafica de barras
  //num_semana!: number;

  // Funcion para convertir un numero a un dia de la semana en espanol
  private convertNumDayToWeekDay(numDay: number) {
    if (numDay === 1) {
      return 'lunes';
    } else if (numDay === 2) {
      return 'martes';
    } else if (numDay === 3) {
      return 'miercoles';
    } else if (numDay === 4) {
      return 'jueves';
    } else if (numDay === 5) {
      return 'viernes';
    } else if (numDay === 6) {
      return 'sabado';
    } else if (numDay === 7) {
      return 'domingo';
    }
    // Add a default return statement here
    return ''; // Or any other default value or error handling
  }

  currentDate: Date = new Date(); // Dia actual
  currentDayOfWeek = this.currentDate.getDay(); // Dia actual de la semana
  selectedOption: String = this.convertNumDayToWeekDay(this.currentDayOfWeek); // Dia seleccionado de la semana

  dia_semana: number = this.currentDayOfWeek; // Dia de la semana seleccionado, se inicializa con el dia actual

  url: string = '';
  percent: any;
  aforo: any; // Aforo auxiliar
  actual: any; // Aforo Actual auxiliar

  fechaInicio = new Date(2023, 1, 13);
  fechaFin = new Date(2023, 5, 25);
  diasExcluidos = [
    new Date(2023, 3, 3),
    new Date(2023, 3, 4),
    new Date(2023, 3, 5),
    new Date(2023, 3, 6),
    new Date(2023, 3, 7),
    new Date(2023, 3, 8),
    new Date(2023, 3, 9),
  ];
  num_semana: number = this.getNumSemana(
    this.fechaInicio,
    this.fechaFin,
    this.diasExcluidos
  );

  // Obtiene el numero de la semana, es decir semana 1, semana 2, semana 3, semana 4, semana 5 o semana tec del bloque
  private getNumSemana(
    fechaInicio: Date,
    fechaFin: Date,
    diasExcluidos: Date[] = []
  ): number {
    const today = new Date();
    const timeDiff = today.getTime() - fechaInicio.getTime();
    const daysDiff = Math.floor(timeDiff / (24 * 60 * 60 * 1000)); // Get the difference in whole days
    const daysCounted = Array.from(
      { length: daysDiff + 1 },
      (_, i) => new Date(fechaInicio.getTime() + i * 24 * 60 * 60 * 1000)
    ).filter(
      (date) =>
        !diasExcluidos.some((d) => d.toDateString() === date.toDateString())
    ); // Get all the counted days, excluding the vacation days
    const weekNumber = Math.floor(daysCounted.length / 7) + 1; // Calculate the week number based on the number of counted days
    return ((weekNumber - 1) % 6) + 1; // Convert the value to the range of 1-6, looping back to 1 if it exceeds 6
  }

  // Cambiar el timestamp a una hora numerica para desplegar
  public convertTimeToHour(timeString: string) {
    const hour = timeString.split(':')[0];
    return Number(hour);
  }

  /*
  public data = [
    { letter: 1, 
      col1: 400, 
      col2: 0, 
      startTime: "20230421 06:00", 
      endTime: "20230421 07:00", 
    },
    { letter: 2, 
      col1: 275, 
      col2: 0, 
      startTime: "20230421 7:00", 
      endTime: "20230421 8:00", 
    }, 
    { letter: 3, 
      col1: 270, 
      col2: 0, 
      startTime: "20230421 8:00", 
      endTime: "20230421 9:00", 
    },
    { letter: 4, 
      col1: 210, 
      col2: 100, 
      startTime: "20230421 9:00", 
      endTime: "20230421 10:00",
    },
    { letter: 5, 
      col1: 190, 
      col2: 0, 
      startTime: "20230421 10:00", 
      endTime: "20230421 11:00", 
    },
    { letter: 6, 
      col1: 170, 
      col2: 0, 
      startTime: "20230421 11:00", 
      endTime: "20230421 12:00",  
    },
    { letter: 7, 
      col1: 150, 
      col2: 0, 
      startTime: "20230421 12:00", 
      endTime: "20230421 13:00",  
    },
    { letter: 8, 
      col1: 85, 
      col2: 0, 
      startTime: "20230421 13:00", 
      endTime: "20230421 14:00",  
    },
    { letter: 9, 
      col1: 120, 
      col2: 0, 
      startTime: "20230421 14:00", 
      endTime: "20230421 15:00",  
    },
    { letter: 10, 
      col1: 200, 
      col2: 0, 
      startTime: "20230421 15:00", 
      endTime: "20230421 16:00",  
    },
    { letter: 11, 
      col1: 170, 
      col2: 0, 
      startTime: "20230421 16:00", 
      endTime: "20230421 17:00",  
    },
    { letter: 12, 
      col1: 270, 
      col2: 0, 
      startTime: "20230421 17:00", 
      endTime: "20230421 18:00",  
    },
    { letter: 13, 
      col1: 350, 
      col2: 0, 
      startTime: "20230421 18:00", 
      endTime: "20230421 19:00",  
    },
    { letter: 14, 
      col1: 300, 
      col2: 0, 
      startTime: "20230421 19:00", 
      endTime: "20230421 20:00",  
    },
    { letter: 15, 
      col1: 275, 
      col2: 0, 
      startTime: "20230421 20:00", 
      endTime: "20230421 21:00",  
    },
    { letter: 16, 
      col1: 250, 
      col2: 0, 
      startTime: "20230421 21:00", 
      endTime: "20230421 22:00",  
    },

  ];
  */

  private svg: any;

  // Margen de la agrafica
  private margin = {
    top: 20,
    right: 20,
    bottom: 16,
    left: 30,
  };

  private width = 820 - this.margin.left - this.margin.right; // Ancho de la grafica
  private height = 320 - this.margin.top - this.margin.bottom; // Altura de la grafica

  private timeParser = timeParse('%Y%m%d %H:%M:%S');
  public hourParser = timeParse('%H:%M:%S');
  /*
  private x = d3.scaleTime()
    .range([0, this.width])
    .domain([this.hourParser("06:00:00")!, this.hourParser("22:00:00")!]);
  */

  private x = d3.scaleLinear().domain([6, 22]).range([0, this.width]);

  private y = d3.scaleLinear().range([this.height, 0]);

  private xAxis = d3.axisBottom<Number>(this.x);
  //.tickFormat(d3.timeFormat("%H"));

  // DefinicioN del eje Y DE LA GRAFICA
  private yAxis = d3
    .axisLeft(this.y)
    .tickSize(-this.width)
    .tickPadding(10)
    .tickFormat(d3.format('d'))
    .tickSizeInner(-this.width)
    .tickSizeOuter(0);

  // Creacion del SVG de la grafica
  private createSvg(): void {
    this.svg = d3
      .select(document.querySelector('#chart-container'))
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')'
      );
  }

  // Creacion de las bnarras de la grafica
  private drawBars(data: ConcurrenciaGimnasio[]): void {
    //console.log("Draw Bars: " + this.data);
    // Create the X-axis band scale

    const currentDate = new Date(); // Dia en formato DATE
    const year = currentDate.getFullYear(); // Year actual
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Mes actual
    const day = currentDate.getDate().toString().padStart(2, '0'); // Dia actual
    const currentDateStr = `${year}${month}${day}`;

    var x = d3
      .scaleTime()
      .range([0, this.width])
      .domain([this.hourParser('06:00:00')!, this.hourParser('22:00:00')!])
      .nice();

    // Draw the X-axis on the DOM
    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('font-weight', 'bold')
      .attr('font-family', 'Helvetica Neue');

    // Set the domain of the y scale to the minimum and maximum values in your data
    const y = d3
      .scaleLinear()
      .domain([0, 350])
      //.domain([0, d3.max(data, d => d.historico!)])
      .range([0, this.height]);

    // Customize the Y-axis ticks and labels
    const yAxis = d3
      .axisLeft(y)
      .tickSize(-this.width)
      .tickPadding(10)
      .tickSizeInner(-this.width)
      .tickSizeOuter(0);

    // Define the domain and range for the Y-axis scale
    const yScale = d3
      .scaleLinear()
      .domain([0, 350])
      //.domain([0, d3.max(data, d => d.historico!)])
      .range([this.height, 0]);

    //Draw the Y-axis on the DOM
    this.svg
      .append('g')
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(-this.width)
          .tickPadding(10)
          .tickFormat(d3.format('d'))
          .tickSizeInner(-this.width)
          .tickSizeOuter(0)
      )
      .attr('font-weight', 'bold')
      .style('font-family', 'Helvetica')
      .selectAll('line')
      .style('stroke', '#ccc')
      .style('stroke-dasharray', '2,2');

    // This is the Historial Bar
    const bars2 = this.svg
      .selectAll('.bar2')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('class', 'bar2')
      .attr('x', function (d: any, i: number) {
        const hour = d.hora_inicio.split(':')[0];
        console.log(x(Number(hour)));
        return Number(hour) * 48 - 285;
      })
      .attr('width', function (d: any, i: number) {
        return 45;
      })
      .attr('y', function (d: any) {
        return yScale(d.historico);
      })
      .attr('height', function (d: any, i: number) {
        return yScale(0) - yScale(d.historico);
      })
      .attr('rx', 5) // add rounded edges
      .attr('ry', 5)
      .attr('fill', '#e8e8e8');

    //This is Real Time Data bar
    const bars1 = this.svg
      .selectAll('.bar1')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('class', 'bar1')
      .attr('x', function (d: any, i: number) {
        const hour = d.hora_inicio.split(':')[0];
        console.log(x(Number(hour)));
        return Number(hour) * 48 - 285;
      })
      .attr('width', function (d: any, i: number) {
        return 45;
      })
      .attr('y', function (d: any) {
        return yScale(d.actual);
      })
      .attr('height', function (d: any, i: number) {
        return yScale(0) - yScale(d.actual);
      })
      .attr('rx', 5) // add rounded edges
      .attr('ry', 5)
      .attr('fill', '#0033A0');
  }

  /*
  const url = '/concurrencias-aforo-gimnasio/' + this.num_semana + '/' + this.dia_semana;

    this._apiService.get(url).subscribe((dataResponse: ConcurrenciaGimnasio[]) => {
      console.log(url);
      this.data = dataResponse;
      console.log("This is data 1" + this.data);
      this.data.forEach(item => {
        console.log('Hora inicio:', item.hora_inicio);
        console.log('historico:', item.historico);
        console.log('actual:', item.actual);
      });
    });

    */

  changeDateSelected(numSemana: number, diaSemana: number) {
    const url =
      '/historial/concurrencias-aforo-gimnasio/' + numSemana + '/' + diaSemana;

    this._apiService.get(url).subscribe((data: ConcurrenciaGimnasio[]) => {
      this.data = data;
      this.createSvg();
      this.drawBars(this.data);
    });
    //this.aforo = data.aforo;
  }

  /*
  changeDateSelected(day: Date = new Date()) {
    this.daySelected = `${day.getFullYear()}-${
      day.getMonth() + 1
    }-${day.getDay()}`;

    this.url = `/registros-gimnasio/fecha=${this.daySelected}&offset=${this.page}`;
    this.timerSubscription = timer(0, 10000)
      .pipe(switchMap(() => this._apiService.get(this.url)))
      .subscribe((data) => {
        console.log('reload');
        this.listaRegistros = data;
        this.dataSource.data = this.listaRegistros;
      });
  }
  */

  ngOnInit(): void {
    /*
    console.log(this.dia_semana);
    console.log(this.num_semana);
    console.log(this.fechaInicio);
    console.log(this.fechaFin);
    

    const url = '/concurrencias-aforo-gimnasio/' + this.num_semana + '/' + this.dia_semana;

    this._apiService.get(url).subscribe((dataResponse: ConcurrenciaGimnasio[]) => {
      console.log(url);
      this.data = dataResponse;
      console.log("This is data 1" + this.data);
      this.data.forEach(item => {
        console.log('Hora inicio:', item.hora_inicio);
        console.log('historico:', item.historico);
        console.log('actual:', item.actual);
      });
    });

    */

    //Pass current date and corresponding week
    this.changeDateSelected(this.num_semana, this.dia_semana);
    console.log(
      'DEBUG: Get day/week of the week: ',
      this.num_semana,
      this.dia_semana
    );
  }

  onOptionChange() {
    console.log(this.selectedOption);
    if (this.selectedOption === 'lunes') {
      this.dia_semana = 1;
    } else if (this.selectedOption === 'martes') {
      this.dia_semana = 2;
    } else if (this.selectedOption === 'miercoles') {
      this.dia_semana = 3;
    } else if (this.selectedOption === 'jueves') {
      this.dia_semana = 4;
    } else if (this.selectedOption === 'viernes') {
      this.dia_semana = 5;
    } else if (this.selectedOption === 'sabado') {
      this.dia_semana = 6;
    } else if (this.selectedOption === 'domingo') {
      this.dia_semana = 7;
    }

    d3.selectAll('svg:not(.ant-progress-circle)').remove();

    //Pass current date and corresponding week based on ribbon date change
    this.changeDateSelected(this.num_semana, this.dia_semana);

    console.log(
      'DEBUG: Get day/week of the week: ',
      this.num_semana,
      this.dia_semana
    );
  }
}
