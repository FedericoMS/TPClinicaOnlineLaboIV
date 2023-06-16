import { Component } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { UserService } from 'src/app/services/user.service';
import { SwalService } from 'src/app/services/swal.service';
import { Turno } from 'src/app/clases/turno';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent {

  listaDeTurnos: Turno[] = [];
  listaDeTurnosDelPaciente: Turno[] = [];
  listaDeTurnosDelEspecialista: Turno[] = [];
  listaPorEspecialidad: Turno[] = [];
  filtroEspecialidad = false;

  constructor(public userService: UserService, private swal: SwalService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.userService.getCollection('turnos').pipe(take(1)).subscribe((turnos) => {
        if (this.userService.getCurrentProfile() == "admin") {
         // console.log(this.userService.getCurrentProfile());
          console.log("HOLA SOY ADMIN");
          this.listaDeTurnos = turnos;
          console.log(this.listaDeTurnos);
        }
        else {
          console.log(this.userService.getCurrentProfile());
          if (this.userService.getCurrentProfile() == "paciente") {
            console.log("HOLA SOY PACIENTE");
            this.listaDeTurnos.forEach((turno) => {
              if (turno.dniPaciente == this.userService.getCurrentDNI()) {
                this.listaDeTurnosDelPaciente.push(turno);
              }
            })
            console.log(this.listaDeTurnosDelPaciente);
          }
          else {
            if (this.userService.getCurrentProfile() == "especialista") {
              console.log("HOLA SOY ESPECIALISTA");
              this.listaDeTurnos.forEach((turno) => {
                if (turno.dniEspecialista == this.userService.getCurrentDNI()) {
                  this.listaDeTurnosDelEspecialista.push(turno);
                }
              })
              console.log(this.listaDeTurnosDelEspecialista);
            }
          }
        }
      });
    }
      , 1500);
    }



    filtrarPorEspecialidad(especialidad : string) 
    {
        this.listaPorEspecialidad = [];
        this.filtroEspecialidad = true;
        this.listaDeTurnosDelPaciente.forEach((turno : Turno) => 
        {
          if(turno.especialidad == especialidad)
          {
            this.listaPorEspecialidad.push(turno);
          }
        });
      
    }

    filtrarPorEspecialidadDelEspecialista(especialidad : string)
    {
      this.listaPorEspecialidad = [];
      this.filtroEspecialidad = true;
      this.listaDeTurnosDelEspecialista.forEach((turno : Turno) => 
      {
        if(turno.especialidad == especialidad)
        {
          this.listaPorEspecialidad.push(turno);
        }
      });

    }
 }


