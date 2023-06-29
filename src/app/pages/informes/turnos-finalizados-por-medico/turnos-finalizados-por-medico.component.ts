import { Component, Input } from '@angular/core';
import { Chart } from 'chart.js';
import * as moment from 'moment';

@Component({
  selector: 'app-turnos-finalizados-por-medico',
  templateUrl: './turnos-finalizados-por-medico.component.html',
  styleUrls: ['./turnos-finalizados-por-medico.component.css']
})
export class TurnosFinalizadosPorMedicoComponent {

  dias : string[] = this.generarDias();
  @Input() listadoRecibido : any[] = [];
  listadoResultante : any[] = [];
  chart : any;
  dataChart : any;
  configChart  : any;

  constructor(){
    setTimeout(() => {
      this.contarTurnosSolicitadosPorMedico();
      this.createChart();
     }, 3500);
  }

    generarDias() {
    const diasAnteriores = 15; 
    const diasPosteriores = 15; 
    const fechaActual = moment();
    const diasArray = [];
  
    for (let i = diasAnteriores; i >= 1; i--) {
      const fecha = fechaActual.clone().subtract(i, 'days');
      const dia = fecha.format('DD/MM');
      diasArray.push(dia);
    }
  
    diasArray.push(fechaActual.format('DD/MM')); 
  
    for (let i = 1; i <= diasPosteriores; i++) {
      const fecha = fechaActual.clone().add(i, 'days');
      const dia = fecha.format('DD/MM');
      diasArray.push(dia);
    }
  
    return diasArray;
  }

   contarTurnosSolicitadosPorMedico() {
    const turnosPorMedico : any = {};
  
    this.listadoRecibido.forEach((turno : any) => {
      if(this.dias.includes(turno.fecha) && turno.estado == 'realizado')
      {
        const especialista = turno.especialista;
        if (turnosPorMedico.hasOwnProperty(especialista)) {
          turnosPorMedico[especialista]++;
        } else {
          turnosPorMedico[especialista] = 1;
        }

      }
    });
  
    const resultado = Object.keys(turnosPorMedico).map((especialista) => ({
      especialista,
      cantidad: turnosPorMedico[especialista],
    }));

    this.listadoResultante = resultado;    
    console.log(this.listadoResultante);
  }

  createChart() {
    const colores: string[] = [];
    const labels: string[] = [];
    const data: number[] = [];
  
    this.listadoResultante.forEach((item: any) => {
      const especialista = item.especialista;
      const cantidad = item.cantidad;
      const randomColor = this.getRandomColor();
  
      labels.push(especialista);
      data.push(cantidad);
      colores.push(randomColor);
    });
  
    this.dataChart = {
      labels: labels,
      datasets: [{
        label: 'Cantidad Turnos por médico (lapso de 30 días)',
        data: data,
        backgroundColor: colores,
        hoverOffset: 4
      }]
    };
  
    this.configChart = {
      type: 'doughnut',
      data: this.dataChart,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        width: 500,
        height: 500
      }
    };
  
    this.chart = new Chart("chart", this.configChart);
  }
  

  getRandomColor(): string {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
