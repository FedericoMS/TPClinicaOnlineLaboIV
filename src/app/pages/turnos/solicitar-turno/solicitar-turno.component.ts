import { Component } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { Especialidad } from 'src/app/clases/especialidad';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { TurnoService } from 'src/app/services/turno.service';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from 'src/app/clases/usuario';
import * as moment from 'moment';
import { SwalService } from 'src/app/services/swal.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.css']
})
export class SolicitarTurnoComponent {

  listaEspecialidades : Especialidad[] = []; 
  listaEspecialistas : Usuario[] = [];
  listaTurnos : Turno[] = [];
  turnosDelEspecialista : Turno[] = [];

  seleccionEspecialidad : boolean = false;
  seleccionEspecialista : boolean = false;
  seleccionDia : boolean = false;
  seleccionHorario : boolean = false;
  turnoNuevo : Turno = new Turno();
  esAdmin : boolean = false;
  diasYHorarios : any = '';


  //DATOS PARA TURNO NUEVO//
  pacienteActual : Usuario = new Usuario();
  paciente : string = '';
  dniPaciente : number = 0;
  especialistaElegido : Usuario = new Usuario();
  nombreEspecialidad : string = '';
  nombreEspecialista : string = '';
  dniEspecialista : number = 0;
  diaSeleccionado : any = '';
  horarioSeleccionado : any = '';
  fechaElegidaString : string = '';


  constructor(private espService : EspecialidadService, private turnoService : TurnoService, private userService : UserService, private swal : SwalService, private router : Router)
  {
    setTimeout(() => {
      this.pacienteActual = this.userService.getCurrentUser();
    //  console.log(this.pacienteActual);
      this.paciente = this.pacienteActual.apellido + ' ' + this.pacienteActual.nombre;
      this.dniPaciente = this.pacienteActual.dni;
      if(this.userService.getCurrentProfile() == 'admin')
      {
        this.esAdmin = true;
      }
  
  
      this.espService.getCollection('especialidades').subscribe((listEsp) => 
      {
        this.listaEspecialidades = listEsp;
       // console.log(this.listaEspecialidades);
      });
  
      this.userService.getCollection('usuarios').subscribe((listUsuarios) => 
      {
  
        listUsuarios.forEach((usuario) => {
        if(usuario.especialidad != null)
        {
          //console.log(usuario);
          this.listaEspecialistas.push(usuario);
        }
        });
    //    console.log(this.listaEspecialistas);
      })      

      this.traerTurnos();
      console.log(this.diasYHorarios);
      console.log(this.diasYHorarios.horarios);
      //console.log(this.diasYHorarios);
      // console.log(this.paciente);
      // console.log(this.dniPaciente);
    }, 3000); //NO ES LA SOLUCIÓN IDEAL 


  }



  mostrarEspecialidades()
  {
    if(!this.seleccionEspecialidad)
    {
      this.seleccionEspecialidad  = true;
    }
    else
    {
      this.seleccionEspecialidad = false;
    }
  }

  asignarEspecialidad(nombreEsp : string)
  {
    this.nombreEspecialidad = nombreEsp;
    this.seleccionEspecialidad = true;
    console.log(this.nombreEspecialidad);
  }

  asignarProfesional(especialista : Usuario)
  {
    this.nombreEspecialista = especialista.apellido + ' ' + especialista.nombre;
    this.dniEspecialista = especialista.dni;
    this.seleccionEspecialista = true;
    this.especialistaElegido = especialista;
    this.diasYHorarios = this.generarDiasYHorariosParaEspecialista(especialista);
    // console.log(especialista);
    // console.log(this.nombreEspecialista);
    // console.log(this.dniEspecialista);
  }


  asignarDia(dia : any)
  {
    this.diaSeleccionado = dia;
    this.fechaElegidaString = dia.dia;
    this.seleccionDia = true;
    console.log(this.diaSeleccionado);
    this.quitarNoDisponibles(this.dniEspecialista, this.fechaElegidaString);
   // console.log(this.diaSeleccionado.dia);

  }

  asignarHorario(horario : string)
  {
    this.horarioSeleccionado = horario;
    console.log(this.horarioSeleccionado);
    this.generarTurno()
  }

  generarTurno() 
  {
    this.turnoNuevo.id = '';
    this.turnoNuevo.fecha = this.fechaElegidaString;
    this.turnoNuevo.hora = this.horarioSeleccionado;
    this.turnoNuevo.especialista = this.nombreEspecialista;
    this.turnoNuevo.especialidad = this.nombreEspecialidad;
    this.turnoNuevo.paciente = this.paciente;
    this.turnoNuevo.resenia = '';
    this.turnoNuevo.encuesta = '';
    this.turnoNuevo.calificacion = '';
    this.turnoNuevo.dniPaciente = this.dniPaciente;
    this.turnoNuevo.dniEspecialista = this.dniEspecialista;
    this.turnoNuevo.estado = 'solicitado';
    this.turnoNuevo.comentarioCancelacion = '';
      try
      {
        this.turnoService.createAppointment(this.turnoNuevo);
        // this.swal.swalert("Turno", "Turno reservado!", 'success');
        //this.insertarTurnoEnEspecialista();
        this.router.navigateByUrl('turnos/misturnos');
      }
      catch(e)
      {
        console.log(e);
      }    

  
  }


  
  /*generarDiasyHorarios() : { dia: string; horarios: string[]}[] {
    const dias = 15; // Cantidad de días a generar
    const fechaActual = moment();
    const fechaFin = moment().add(dias, 'days');
    const diasHorariosArray: { dia: string, horarios: string[] }[] = [];
  
    while (fechaActual.isSameOrBefore(fechaFin)) {
      // Verifica si el día actual no es domingo (valor 0 en moment.js)
      if (fechaActual.day() !== 0) {
        const dia = fechaActual.format('DD/MM');
        const horariosDia: string[] = [];
  
        // Verifica si el día actual es sábado
        if (fechaActual.day() === 6) {
          const horaInicio = moment('8:00 am', 'h:mm a');
          const horaFin = moment('1:30 pm', 'h:mm a');
          const intervaloMinutos = 30;
  
          while (horaInicio.isSameOrBefore(horaFin)) {
            horariosDia.push(horaInicio.format('h:mm a'));
            horaInicio.add(intervaloMinutos, 'minutes');
          }
        } else {
          const horaInicio = moment('8:00 am', 'h:mm a');
          const horaFin = moment('6:30 pm', 'h:mm a');
          const intervaloMinutos = 30;
  
          while (horaInicio.isSameOrBefore(horaFin)) {
            horariosDia.push(horaInicio.format('h:mm a'));
            horaInicio.add(intervaloMinutos, 'minutes');
          }
        }
  
        diasHorariosArray.push({ dia: dia, horarios: horariosDia });
      }
  
      fechaActual.add(1, 'day');
    }

    console.log(diasHorariosArray);
  
    return diasHorariosArray;
  }*/

  generarDiasYHorariosParaEspecialista(especialista : Usuario) {
    const dias = 15; // Cantidad de días a generar
    const fechaActual = moment();
    const fechaFin = moment().add(dias, 'days');
    const diasHorariosArray = [];
  
    for (let i = 0; i <= dias; i++) {
      const fecha = fechaActual.clone().add(i, 'days');
  
      // Verifica si el día actual no es domingo (valor 0 en moment.js)
      if (fecha.day() !== 0) {
        const dia = fecha.format('DD/MM');
        const horariosDia = [];
  
        // Verifica si el día actual es sábado
        if (fecha.day() === 6 && especialista.dias[6]) {
          const horaInicio = moment('8:00 am', 'h:mm a');
          const horaFin = moment('1:30 pm', 'h:mm a');
          const intervaloMinutos = 30;
  
          while (horaInicio.isSameOrBefore(horaFin)) {
            horariosDia.push(horaInicio.format('h:mm a'));
            horaInicio.add(intervaloMinutos, 'minutes');
          }
          diasHorariosArray.push({ dia, horarios: horariosDia });
        } else if (especialista.dias[fecha.day()]) {
          const horaInicio = moment('8:00 am', 'h:mm a');
          const horaFin = moment('6:30 pm', 'h:mm a');
          const intervaloMinutos = 30;
  
          while (horaInicio.isSameOrBefore(horaFin)) {
            horariosDia.push(horaInicio.format('h:mm a'));
            horaInicio.add(intervaloMinutos, 'minutes');
          }
          diasHorariosArray.push({ dia, horarios: horariosDia });
        }
      }
    }
  
    console.log(diasHorariosArray);
  
    return diasHorariosArray;
  }
  
  


  traerTurnos()
  {
    this.turnoService.getCollection('turnos').subscribe((listaObtenida) => 
    {
      this.listaTurnos = listaObtenida;
    })
  }

  quitarNoDisponibles(dniEspecialista: number, dia: string) {
    this.turnosDelEspecialista = this.listaTurnos.filter(turno =>
      turno.dniEspecialista === dniEspecialista && turno.fecha === dia
    );
  }

  esHorarioOcupado(horario: string) {
    return this.turnosDelEspecialista.some(turno => turno.hora === horario);
  }
  
  

  
  

}
