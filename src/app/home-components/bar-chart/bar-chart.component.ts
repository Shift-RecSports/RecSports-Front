import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { timeFormat } from "d3-time-format";
import { timeParse } from 'd3-time-format';




@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})


export class BarChartComponent implements OnInit {

  private data = [
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

  private svg: any;

  private margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40
  };
  
  private width = 700 - this.margin.left - this.margin.right;
  private height = 200 - this.margin.top - this.margin.bottom;

  private timeParser = timeParse("%Y%m%d %H:%M");
  private x = d3.scaleTime()
    .range([0, this.width])
    .domain([this.timeParser("20230421 06:00")!, this.timeParser("20230421 22:00")!]);

  private y = d3.scaleLinear()
    .range([this.height, 0]);

  private xAxis = d3.axisBottom<Date>(this.x)
    .tickFormat(d3.timeFormat("%H"));

  private yAxis = d3.axisLeft(this.y)
    .tickSize(-this.width)
    .tickPadding(10)
    .tickFormat(d3.format("d"))
    .tickSizeInner(-this.width)
    .tickSizeOuter(0);

  
  private createSvg(): void {
    this.svg = d3.select(document.querySelector("#chart-container"))
      .append("svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
  }

  private drawBars(data: any[]): void {
    
    // Create the X-axis band scale
    var x = d3.scaleTime()
      .range([0, this.width])
      .domain([this.timeParser("20230421 06:00")!, this.timeParser("20230421 22:00")!])

    // Draw the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")

    

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(y)
      .tickSize(-this.width)
      .tickPadding(10)
      .tickFormat(d3.format("d"))
      .tickSizeInner(-this.width)
      .tickSizeOuter(0));



    // Create and fill bars

    const bars1 = this.svg.selectAll(".bar1")
      .data(this.data)
      .enter()
      .append("rect")
      .attr("class", "bar1")
      .attr("x", function(d: any) {
        return x(timeParse("%Y%m%d %H:%M")(d.startTime)!);
      })
      .attr("width", this.width / this.data.length - 1)
      /*
      .attr("width", function(d : any, i : number){
        const startTime = timeParse("%Y%m%d %H:%M")(d.startTime)!;
        const endTime = timeParse("%Y%m%d %H:%M")(d.endTime)!;
        return x(endTime) - x(startTime) - 1;
      })
      */
      .attr("y", function(d : any) {
        return y(d.col1);
      })
      .attr("height", (d : any) => {
        return this.height - y(d.col1);
      })
      .attr("fill", "#d04a35")
      .attr("rx", 5) // add rounded edges
      .attr("ry", 5);

    const bars2 = this.svg.selectAll(".bar2")
      .data(this.data)
      .enter()
      .append("rect")
      .attr("class", "bar2")
      .attr("x", function(d: any) {
        return x(timeParse("%Y%m%d %H:%M")(d.startTime)!);
      })
      /*
      .attr("width", function(d : any, i : number){
        const startTime = timeParse("%Y%m%d %H:%M")(d.startTime)!;
        const endTime = timeParse("%Y%m%d %H:%M")(d.endTime)!;
        return x(endTime) - x(startTime) - 1;
      })
      */
      .attr("width", this.width / this.data.length - 1)
      .attr("y", function(d : any) {
        return y(d.col2);
      })
      .attr("height", (d : any) => {
        return this.height - y(d.col1);
      })
      .attr("rx", 5) // add rounded edges
      .attr("ry", 5);

  }

  ngOnInit(): void {
    this.createSvg();
    this.drawBars(this.data);
  }
}



