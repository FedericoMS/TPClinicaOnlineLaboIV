import { Component, Input } from '@angular/core';
import * as moment from 'moment';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-turnos-diarios',
  templateUrl: './turnos-diarios.component.html',
  styleUrls: ['./turnos-diarios.component.css']
})
export class TurnosDiariosComponent {

    dias : string[] = this.generarDias();
    @Input() listadoRecibido : any[] = [];
    listadoResultante : any[] = [];
    chart : any;
    dataChart : any;
    configChart  : any;

    constructor(){
      setTimeout(() => {
        this.contarTurnosPorFecha();
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
    
      console.log(diasArray);
    
      return diasArray;
    }

     contarTurnosPorFecha() {
      const turnosPorFecha : any = {};
    
      this.listadoRecibido.forEach((turno) => {
        const fecha = turno.fecha;
        if (turnosPorFecha.hasOwnProperty(fecha)) {
          turnosPorFecha[fecha]++;
        } else {
          turnosPorFecha[fecha] = 1;
        }
      });
    
      const resultado = Object.keys(turnosPorFecha).map((fecha) => ({
        fecha,
        cantidad: turnosPorFecha[fecha],
      }));

      resultado.forEach((elemento : any) =>
      {
        if(this.dias.includes(elemento.fecha))
        {
          this.listadoResultante.push(elemento);
        }

      } )

      this.listadoResultante.sort((a: any, b: any) => {
        const fechaA = moment(a.fecha, 'DD/MM');
        const fechaB = moment(b.fecha, 'DD/MM');
        return fechaA.diff(fechaB);
      });
    
      console.log(this.listadoResultante);
    }

    createChart() {
      const colores: string[] = [];
      const labels: string[] = [];
      const data: number[] = [];
    
      this.listadoResultante.forEach((item: any) => {
        const fecha = item.fecha;
        const cantidad = item.cantidad;
        const randomColor = this.getRandomColor();
    
        labels.push(fecha);
        data.push(cantidad);
        colores.push(randomColor);
      });
    
      this.dataChart = {
        labels: labels,
        datasets: [{
          label: 'Cantidad Turnos por día (30 días)',
          data: data,
          backgroundColor: colores,
          hoverOffset: 4
        }]
      };
    
      this.configChart = {
        type: 'bar',
        data: this.dataChart,
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
