import { Turno } from "./turno";
export class Usuario {
    id: number;
    perfil: string;
    nombre: string;
    apellido: string;
    edad: number;
    dni: number;
    obraSocial: string;
    especialidad: string;
    email: string;
    clave: string;
    imagen1: string;
    imagen2: string;
    aprobado: boolean;
    dias : boolean[] = [false, true, true, true, true, true, true];
  /*  horaInicioLunes : string;
    horaFinLunes : string;
    horaInicioSabado : string;
    horaFinSabado : string;*/
    //disponibilidad : { [dia : string]: string[] }[] | null = []; 
    //{ dia: string; horarios: string[]} | null;
    /*disponibilidad : {
      lunes: string[];
      martes: string[];
      miercoles: string[];
      jueves: string[];
      viernes: string[];
      sabado: string[];
    };*/
    //turnos : Turno[];
  
    constructor() {
      this.id = 0;
      this.perfil = '';
      this.nombre = '';
      this.apellido = '';
      this.edad = 0;
      this.dni = 0;
      this.obraSocial = '';
      this.especialidad = '';
      this.email = '';
      this.clave = '';
      this.imagen1 = '';
      this.imagen2 = '';
      this.aprobado = false;
      /*this.horaInicioLunes = '8:00 am';
      this.horaFinLunes = '7:00 pm';
      this.horaInicioSabado = '8:00 am';
      this.horaFinSabado = '2:00 pm';*/

     // this.disponibilidad = null;
      /*{
        lunes: [
          '8:00 am', '8:30 am', '9:00 am', '9:30 am', '10:00 am', '10:30 am',
          '11:00 am', '11:30 am', '12:00 pm', '12:30 pm', '1:00 pm', '1:30 pm',
          '2:00 pm', '2:30 pm', '3:00 pm', '3:30 pm', '4:00 pm', '4:30 pm',
          '5:00 pm', '5:30 pm', '6:00 pm', '6:30 pm'
        ],
        martes: [
          '8:00 am', '8:30 am', '9:00 am', '9:30 am', '10:00 am', '10:30 am',
          '11:00 am', '11:30 am', '12:00 pm', '12:30 pm', '1:00 pm', '1:30 pm',
          '2:00 pm', '2:30 pm', '3:00 pm', '3:30 pm', '4:00 pm', '4:30 pm',
          '5:00 pm', '5:30 pm', '6:00 pm', '6:30 pm'
        ],
        miercoles: [
          '8:00 am', '8:30 am', '9:00 am', '9:30 am', '10:00 am', '10:30 am',
          '11:00 am', '11:30 am', '12:00 pm', '12:30 pm', '1:00 pm', '1:30 pm',
          '2:00 pm', '2:30 pm', '3:00 pm', '3:30 pm', '4:00 pm', '4:30 pm',
          '5:00 pm', '5:30 pm', '6:00 pm', '6:30 pm'
        ],
        jueves: [
          '8:00 am', '8:30 am', '9:00 am', '9:30 am', '10:00 am', '10:30 am',
          '11:00 am', '11:30 am', '12:00 pm', '12:30 pm', '1:00 pm', '1:30 pm',
          '2:00 pm', '2:30 pm', '3:00 pm', '3:30 pm', '4:00 pm', '4:30 pm',
          '5:00 pm', '5:30 pm', '6:00 pm', '6:30 pm'
        ],
        viernes: [
          '8:00 am', '8:30 am', '9:00 am', '9:30 am', '10:00 am', '10:30 am',
          '11:00 am', '11:30 am', '12:00 pm', '12:30 pm', '1:00 pm', '1:30 pm',
          '2:00 pm', '2:30 pm', '3:00 pm', '3:30 pm', '4:00 pm', '4:30 pm',
          '5:00 pm', '5:30 pm', '6:00 pm', '6:30 pm'
        ],
        sabado: [
          '8:00 am', '8:30 am', '9:00 am', '9:30 am', '10:00 am', '10:30 am',
          '11:00 am', '11:30 am', '12:00 pm', '12:30 pm', '1:00 pm', '1:30 pm',
          '2:00 pm', '2:30 pm', '3:00 pm', '3:30 pm'
        ]
      };*/

    }
  }

  