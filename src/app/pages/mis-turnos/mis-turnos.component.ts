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

  cancelarTurno(turno: Turno, opcion : number, comentario: string, emisor: string = "paciente") {
    if(opcion == 1)
    {
      if (turno.estado == 'solicitado') {
        turno.estado = "cancelado";
        turno.comentarioCancelacion = comentario;
        this.turnoService.updateAppointment(turno);
        this.swal.showToast(
          'Se canceló el turno',
          'info'
        );
      }
    }
    else 
    {
      if(opcion == 2)
      {
        if (turno.estado == 'solicitado') {
          turno.estado = "rechazado";
          turno.comentarioCancelacion = comentario;
          this.turnoService.updateAppointment(turno);
          this.swal.showToast(
            'Se canceló el turno',
            'info'
          );
        }

      }
    }
  }

  aceptarTurno(turno: Turno) {
    turno.estado = "aceptado";
    this.turnoService.updateAppointment(turno);
    this.swal.showToast(
      'Se aceptó el turno!',
      'success'
    );
  }

  dejarCalificacion(turno: Turno, comentario: string, emisor: string = "paciente") {
    if (turno.estado == 'realizado') {
      turno.calificacion = comentario;
      this.turnoService.updateAppointment(turno);
      this.swal.showToast(
        'Se envió su opinión!',
        'success'
      );
    }
  }

  dejarResenia(turno: Turno, comentario: string, emisor: string = "paciente") {
      turno.resenia = comentario;
      turno.estado = "realizado";
      this.turnoService.updateAppointment(turno);
      this.swal.showToast(
        'Se envió su reseña!',
        'success'
      );
  }

    enviarEncuesta(turno: Turno,  comentario : string, emisor : string = "paciente") {
      if (turno.estado == 'realizado') {
          turno.encuesta = comentario;
          this.turnoService.updateAppointment(turno);
           this.swal.showToast(
             'Se envió su opinión!',
             'success'
           );
        } 
    }


    modalAceptacion(turno: Turno)
    {
      this.swal.showModal("Aceptar turno", "¿Quiere aceptar el turno del paciente?", "Turno aceptado", "Se confirmó el turno con éxito",  () => {
          this.aceptarTurno(turno);   
      });
    }

    modalFinalizacion(turno: Turno, emisor: string)
    {
      this.swal.showModalText("Finalizar turno", "Deje su reseña y diagnóstico", "Escriba su reseña",  (comentario : string) => {
        if(comentario != '')
        {
          this.dejarResenia(turno, comentario, emisor);
        }
        else
        {
          this.swal.swalert("Error", "Tiene que escribir una reseña para finalizar el turno", "error");
        }
      });
    }
    




    modalCancelacion(turno: Turno, opcion : number, emisor: string)
    {
      if(opcion == 1)
      {
        this.swal.showModalText("Atención", "¿Está seguro que quiere cancelar el turno?", "Escriba su motivo",  (comentario : string) => {
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
        else
        {
          if(opcion == 2)
          {
            this.swal.showModalText("Atención", "¿Está seguro que quiere rechazar el turno?", "Escriba el motivo del rechazo",  (comentario : string) => {
              if(comentario != '')
              {
                this.cancelarTurno(turno, opcion, comentario, emisor);
              }
              else
              {
                this.swal.swalert("Error", "Tiene que escribir un comentario para rechazar el turno", "error");
              }

          });
        }
      }

    }

    modalCalificacion(turno: Turno, emisor: string)
    {
      this.swal.showModalText("Calificación", "¿Estuvo satisfecho con la atención recibida?", "Escriba su comentario",  (comentario : string) => {
        if(comentario != '')
        {
          this.dejarCalificacion(turno, comentario, emisor);
        }
        else
        {
          this.swal.swalert("Error", "Tiene que escribir un comentario para dar su calificación", "error");
        }
      });
    }

    modalEncuesta(turno: Turno, emisor: string)
    {
      this.swal.showModalText("Encuesta", "¿Qué le parece la plataforma de Clínica Online?", "Escriba su comentario",  (comentario : string) => {
        if(comentario != '')
        {
          this.enviarEncuesta(turno, comentario, emisor);
        }
        else
        {
          this.swal.swalert("Error", "Tiene que escribir un comentario para dar su calificación", "error");
        }
      });
    }

    verResenia(reseña : string)
    {
      this.swal.swalert("Su reseña", reseña, "info");
    }
 }


