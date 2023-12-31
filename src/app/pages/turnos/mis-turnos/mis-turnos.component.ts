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
  turnosFiltrados : Turno[] = [];

  filtroEspecialidad = false;
  filtroEspecialista = false;
  filtroPaciente = false;

  botonCancelar : boolean = false;
  encuestaCompletada : boolean = false;
  palabraFiltro : string = '';


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

  dejarDatos(turno: Turno) {
    turno.estado = "realizado";
    this.turnoService.updateAppointment(turno);
    this.swal.showToast(
      'Se envió su reseña e historial clínico!',
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

  modalFinalizacion(turno: Turno) {
    this.swal.showModalWithInputs((datos: any) => {
      if(datos.resenia == '' || datos.altura == 0 || datos.peso == 0 || datos.temperatura == 0 || datos.presion == '')
      {
        this.swal.swalert("Error", "Tiene que completar todos los campos para finalizar el turno", "error");
      }
      else
      {
        turno.resenia = datos.resenia;
        turno.altura = datos.altura;
        turno.peso = datos.peso;
        turno.temperatura = datos.temperatura;
        turno.presion = datos.presion;
        turno.dato1 = [datos.dato1_clave, datos.dato1_valor];
        turno.dato2 = [datos.dato2_clave, datos.dato2_valor];
        turno.dato3 = [datos.dato3_clave, datos.dato3_valor];
        this.dejarDatos(turno);

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

    verPorEspecialidad()
    {
      this.filtroEspecialista = false;
      this.filtroPaciente = false;
      this.filtroEspecialidad = true;
    }

    verPorEspecialista()
    {
      this.filtroEspecialidad = false;
      this.filtroPaciente = false;
      this.filtroEspecialista = true;
    }
    
    verPorPaciente()
    {
      this.filtroEspecialidad = false;
      this.filtroEspecialista = false;
      this.filtroPaciente = true;
    }

    filtrarPorPalabra(listaArg : Turno[]) {
      this.turnosFiltrados = [];
      if (this.palabraFiltro == '') 
      {
        this.turnosFiltrados = [...listaArg];
      } 
      else 
      {
        const palabra : string = this.palabraFiltro.trim().toLocaleLowerCase();
        for (let i = 0; i < listaArg.length; i++) 
        {
          const turno = listaArg[i];
          if (
            turno.especialista.toLocaleLowerCase().includes(palabra) ||
            turno.especialidad.toLocaleLowerCase().includes(palabra) ||
            turno.estado.toLocaleLowerCase().includes(palabra) ||
            turno.paciente.toLocaleLowerCase().includes(palabra) ||
            turno.fecha?.includes(palabra) ||
            turno?.altura?.toString().includes(palabra) ||
            turno?.peso?.toString().includes(palabra) ||
            turno?.temperatura?.toString().includes(palabra) ||
            turno?.presion?.includes(palabra) ||
            turno?.dato1?.[0]?.includes(palabra) ||
            turno?.dato2?.[0]?.includes(palabra) ||
            turno?.dato3?.[0]?.includes(palabra) ||
            turno?.dato1?.[1]?.includes(palabra) ||
            turno?.dato2?.[1]?.includes(palabra) ||
            turno?.dato3?.[1]?.includes(palabra)) 
            {
            this.turnosFiltrados.push(turno);
          }
        }
      }
    }
    

 }


