import { Component, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-turnos-por-especialidad',
  templateUrl: './turnos-por-especialidad.component.html',
  styleUrls: ['./turnos-por-especialidad.component.css']
})
export class TurnosPorEspecialidadComponent {

  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  chart? : any = '';
  dataChart : any;
  configChart  : any;

  @Input() listadoRecibido : any[] = [];

  constructor(){}

  ngAfterViewInit() {
    setTimeout(() => {
      this.createChart();
      console.log("Hola");
      
    }, 3000);
  }

  createChart() {
    const counts: { [key: string]: number } = {};
    const uniqueEspecialidades: string[] = [];
  
    this.listadoRecibido.forEach((item: any) => {
      const especialidad = item;
      counts[especialidad] = counts[especialidad] ? counts[especialidad] + 1 : 1;
    });
  
    for (const especialidad in counts) {
      if (counts.hasOwnProperty(especialidad)) {
        uniqueEspecialidades.push(especialidad);
      }
    }
    console.log(counts);
    console.log(this.listadoRecibido);
    console.log(uniqueEspecialidades);
  
    this.dataChart = {
      labels: uniqueEspecialidades,
      datasets: [{
        label: 'Cantidad Turnos',
        data: counts,
        hoverOffset: 4
      }]
    };
    

    this.configChart = {
      type: 'bar',
      data: this.dataChart,
    };
  
    this.chart = new Chart("chart", this.configChart);


  }


  

}
