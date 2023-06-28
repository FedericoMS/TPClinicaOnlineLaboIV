import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TurnoService } from 'src/app/services/turno.service';
import { Chart } from 'chart.js';
import { Turno } from 'src/app/clases/turno';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent {  
  listaLogIngresos : any[] = []
  listaEspecialidades : string[] = []
  listaTurnos : Turno[] = [];

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

  

}
