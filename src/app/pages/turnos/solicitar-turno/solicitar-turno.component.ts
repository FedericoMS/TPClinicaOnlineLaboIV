import { Component } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { Especialidad } from 'src/app/clases/especialidad';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { TurnoService } from 'src/app/services/turno.service';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from 'src/app/clases/usuario';
import * as moment from 'moment';
import { SwalService } from 'src/app/services/swal.service';

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
  diasYHorarios : any = this.generarDiasyHorarios();

  horarioLunesAViernes = ['8:00 am', '8:30 am', '9:00 am', '9:30 am', '10:00 am', '10:30 am',
    '11:00 am', '11:30 am', '12:00 pm', '12:30 pm', '1:00 pm', '1:30 pm',
    '2:00 pm', '2:30 pm', '3:00 pm', '3:30 pm', '4:00 pm', '4:30 pm',
    '5:00 pm', '5:30 pm', '6:00 pm', '6:30 pm'];

  horarioSab = ['8:00 am', '8:30 am', '9:00 am', '9:30 am', '10:00 am', '10:30 am',
    '11:00 am', '11:30 am', '12:00 pm', '12:30 pm', '1:00 pm', '1:30 pm'];


  //DATOS PARA TURNO NUEVO//
  pacienteActual : Usuario = new Usuario();
  paciente : string = '';
  dniPaciente : number = 0;
  especialistaElegido : Usuario = new Usuario();
  nombreEspecialidad : string = '';
  nombreEspecialista : string = '';
  dniEspecialista : number = 0;
  diaSeleccionado : string = '';
  horarioSeleccionado : string = '';
  horariosLaborales : string[] = ['8:00 am', '8:30 am', '9:00 am', '9:30 am', '10:00 am', '10:30 am',
  '11:00 am', '11:30 am', '12:00 pm', '12:30 pm', '1:00 pm', '1:30 pm',
  '2:00 pm', '2:30 pm', '3:00 pm', '3:30 pm', '4:00 pm', '4:30 pm',
  '5:00 pm', '5:30 pm', '6:00 pm', '6:30 pm'];

  constructor(private espService : EspecialidadService, private turnoService : TurnoService, private userService : UserService, private swal : SwalService)
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
    console.log(especialista);
  //  console.log(especialista);
    console.log(this.nombreEspecialista);
    console.log(this.dniEspecialista);
  }


  asignarDia(dia : string)
  {
    this.diaSeleccionado = dia;
    this.seleccionDia = true;
    console.log(this.diaSeleccionado);
   // console.log(this.diaSeleccionado.dia);
    this.quitarNoDisponibles(this.dniEspecialista, this.diaSeleccionado)
  }

  asignarHorario(horario : string)
  {
    this.horarioSeleccionado = horario;
    console.log(this.horarioSeleccionado);
  }

  generarTurno() 
  {
    this.turnoNuevo.id = '';
    this.turnoNuevo.fecha = this.diaSeleccionado;
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
       // this.insertarTurnoEnEspecialista();
      }
      catch(e)
      {
        console.log(e);
      }    

  
  }


  generarDiasyHorarios() : { dia: string; horarios: string[]}[] {
    const dias = 15; // Cantidad de días a generar
    const fechaActual = moment();
    const fechaFin = moment().add(dias, 'days');
    const diasHorariosArray: { dia: string, horarios: string[] }[] = [];
  
    while (fechaActual.isSameOrBefore(fechaFin)) {
      // Verificar si el día actual no es domingo (valor 0 en moment.js)
      if (fechaActual.day() !== 0) {
        const dia = fechaActual.format('DD/MM');
        const horariosDia: string[] = [];
  
        // Verificar si el día actual es sábado
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
  }


  traerTurnos()
  {
    this.turnoService.getCollection('turnos').subscribe((listaObtenida) => 
    {
      this.listaTurnos = listaObtenida;
      console.log(this.listaTurnos);
    })
  }

  quitarNoDisponibles(dniEspecialista: number, dia: string) {
    
    this.listaTurnos.forEach((turno) => {
      if (turno.dniEspecialista === dniEspecialista) {
        this.turnosDelEspecialista.push(turno);
      }
    });
  
    this.turnosDelEspecialista.forEach((turno) => {
      if (turno.fecha === dia) {
        this.horariosLaborales.forEach((hora) => 
        {
          if(turno.hora == hora)
          {
            this.turnosDelEspecialista            
          }
        })

      }
    });

  }
  

  // verificarDisponibilidad(dniEspecialista : number, dia : string, horario : string)
  // {
  //   this.listaTurnos.forEach((turno) => 
  //   {
  //     if(turno.dniEspecialista == dniEspecialista)
  //     {
  //       this.turnosDelEspecialista.push(turno);
  //     }
  //   })

  //   this.turnosDelEspecialista.forEach((turno) => 
  //   {
  //     if(turno.fecha == dia && turno.hora == horario)
  //     {
  //       this.diasYHorarios
  //     }
  //   })

  // }






  /*
  insertarTurnoEnEspecialista() {
    if (this.especialistaElegido && this.diaSeleccionado && this.horarioSeleccionado) {
      const especialista = { ...this.especialistaElegido };
      const dia = this.diaSeleccionado.dia;
      const horario = this.horarioSeleccionado;
      
      if (!especialista.disponibilidad) {
        especialista.disponibilidad = [];
      }
  
      const disponibilidadDia = especialista.disponibilidad.find((item) => item[dia] !== undefined);
      if (disponibilidadDia) {
        disponibilidadDia[dia].push(horario);
      } else {
        const nuevaDisponibilidad = { [dia]: [horario] };
        especialista.disponibilidad.push(nuevaDisponibilidad);
      }
  
      this.userService.updateUser(especialista);
    }
  }*/
  
  
  
  /*
  verificarDisponibilidadDia(usuario: Usuario, dia: string): boolean {
    let hayDisponibilidad: boolean = true;
    if (usuario.disponibilidad != null && Array.isArray(usuario.disponibilidad)) {
      usuario.disponibilidad.forEach((diaObj: { dia: string; horarios: string[] }) => {
        if (diaObj.dia === dia) {
          if (
            this.arraysEqual(diaObj.horarios, this.horarioLunesAViernes) ||
            this.arraysEqual(diaObj.horarios, this.horarioSab)
          ) {
            hayDisponibilidad = false;
          }
        }
      });
    }
    return hayDisponibilidad;
  }

  verificarDisponibilidadDiaCompleta(especialista: Usuario, dia: string): boolean {
    if (especialista.disponibilidad != null) {
      const disponibilidadDia = especialista.disponibilidad.dia === dia;
      if (disponibilidadDia && especialista.disponibilidad.horarios.length > 0) {
        return false; // Hay al menos un horario disponible en el día
      }
    }
    return true; // No hay horarios disponibles en el día
  }
  
  verificarDisponibilidadHorario(especialista: Usuario, dia: string, horario: string): boolean {
    if (especialista.disponibilidad != null) {
      const horarioDisponible = especialista.disponibilidad.horarios.includes(horario);
      // console.log(especialista.disponibilidad.dia);
      // console.log(dia);
      if (horarioDisponible && especialista.disponibilidad.dia == dia) {
        return false; // El horario ya está dentro de especialista
      }
    }
    return true; // El horario no está dentro de especialista
  }*/
  
  





  
  arraysEqual(a: any[], b: any[]): boolean {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
  
    return true;
  }

  
  /*asignarHorarioUsuario(usuario: Usuario, dia: string, horario: string) {
    if (!usuario.disponibilidad) {
      usuario.disponibilidad = { dia: dia, horarios: [] };
    }
    if (usuario.disponibilidad.dia !== dia) {
      usuario.disponibilidad = { dia: dia, horarios: [] };
    }
    usuario.disponibilidad.horarios.push(horario);
  }*/

  

}
