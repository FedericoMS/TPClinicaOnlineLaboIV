import { Component } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { UserService } from 'src/app/services/user.service';
import { SwalService } from 'src/app/services/swal.service';
import { TurnoService } from 'src/app/services/turno.service';
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

  botonCancelar : boolean = false;
  encuestaCompletada : boolean = false;

  constructor(public userService: UserService, private swal: SwalService, private turnoService : TurnoService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.turnoService.getCollection('turnos').pipe(take(1)).subscribe((turnos) => {
        this.listaDeTurnos = turnos; 
        if (this.userService.getCurrentProfile() == "admin") {
          console.log("HOLA SOY ADMIN");
          console.log(this.listaDeTurnos);
        }
        else {
          console.log(this.userService.getCurrentProfile());
          if (this.userService.getCurrentProfile() == "paciente") {
            console.log("HOLA SOY PACIENTE");
            this.listaDeTurnos.forEach((turno : Turno) => {
              console.log(turno.dniPaciente);
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

    cancelarTurno(turno: Turno, opcion: number, comentario : string, emisor : string = "paciente") {
      //Cancelación de paciente a especialista
      if (turno.estado == 'solicitado') {
        if (opcion == 1) {
          turno.estado = "cancelado";
          turno.comentarioCancelacion = comentario;
          this.turnoService.updateAppointment(turno);
         // this.userService.updateUser(usuario);
          // this.swal.showToast(
          //   'Se habilitó al especialista',
          //   'success'
          // );
        } 
        else 
        {
          if (opcion == 2) {
           // usuario.aprobado = false;
           // this.userService.updateUser(usuario);
            this.swal.showToast(
              'Se deshabilitó al especialista',
              'info'
            );
          }
        }
      }
    }

    modalCancelacionPaciente(turno: Turno, opcion: number, emisor: string)
    {
      this.swal.showModalText("Atención", "¿Está seguro que quiere cancelar su turno?", "Escriba su comentario",  (comentario : string) => {
        if(comentario != '')
        {
          this.cancelarTurno(turno, opcion, comentario, emisor);
        }
        else
        {
          this.swal.swalert("Error", "Tiene que escribir un comentario para cancelar el turno", "error");
        }
      });

    }

    verResenia(reseña : string)
    {
      this.swal.swalert("Su reseña", reseña, "info");
    }
 }


