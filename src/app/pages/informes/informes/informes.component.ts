import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TurnoService } from 'src/app/services/turno.service';
import { Chart } from 'chart.js';
import { Turno } from 'src/app/clases/turno';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from "xlsx"

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent {  
  listaLogIngresos : any[] = []
  listaEspecialidades : string[] = []
  listaTurnos : Turno[] = [];

  mostrarLog : boolean = false;
  mostrarTurnosDiarios : boolean = false;
  mostrarFinalizados : boolean = false;
  mostrarSolicitados : boolean = false;
  mostrarPorEspecialidad : boolean = false;


  constructor(private userService : UserService, private turnoService : TurnoService)
  {
    setTimeout(() => {

      this.turnoService.getCollection('turnos').subscribe((turnos : any) =>
      {
        this.listaTurnos = turnos;
      })

      this.userService.getCollection('datos de ingresos').subscribe((logs : any) => 
      {
        this.listaLogIngresos = logs;
        //console.log(this.listaLogIngresos);
      })

      this.turnoService.getCollection('turnos').subscribe((turnos : any) => 
      {
        turnos.forEach((turno : any) => 
        {
          this.listaEspecialidades.push(turno.especialidad);
        })
       // console.log(this.listaEspecialidades);
      })
      
    }, 2000);
  }

  mostrarComponente(opcion: number) {
    switch (opcion) 
    {
      case 1:
        this.mostrarLog = !this.mostrarLog;
        this.mostrarFinalizados = false;
        this.mostrarPorEspecialidad = false;
        this.mostrarSolicitados = false;
        this.mostrarTurnosDiarios = false
        break;

      case 2:
        this.mostrarFinalizados = !this.mostrarFinalizados;
        this.mostrarLog = false;
        this.mostrarPorEspecialidad = false;
        this.mostrarSolicitados = false;
        this.mostrarTurnosDiarios = false
        break;

      case 3:
        this.mostrarSolicitados = !this.mostrarSolicitados;
        this.mostrarLog = false;
        this.mostrarPorEspecialidad = false;
        this.mostrarTurnosDiarios = false
        this.mostrarFinalizados = false;
        break;

      case 4:
        this.mostrarPorEspecialidad = !this.mostrarPorEspecialidad;
        this.mostrarSolicitados = false;
        this.mostrarLog = false;
        this.mostrarTurnosDiarios = false
        this.mostrarFinalizados = false;
        break;

      case 5:
        this.mostrarTurnosDiarios = !this.mostrarTurnosDiarios;
        this.mostrarPorEspecialidad = false;
        this.mostrarSolicitados = false;
        this.mostrarLog = false;
        this.mostrarFinalizados = false;
        break;

      default:
        this.mostrarTurnosDiarios = false;
        this.mostrarPorEspecialidad = false;
        this.mostrarSolicitados = false;
        this.mostrarLog = false;
        this.mostrarFinalizados = false;
        break;
    }
  }



  descargarPDF() {
    const DATA: any = document.getElementById('graficos');
    const doc = new jsPDF('p', 'pt', 'a4', true);
    const options = {
      background: 'white',
      scale: 1
    };
  
    html2canvas(DATA, options).then((canvas) => {
      const img = canvas.toDataURL('image/png');
  
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = doc.getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - (2 * bufferX);
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight);
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_estadisticas_sprint4.pdf`);
    });
  }
 
  

}
