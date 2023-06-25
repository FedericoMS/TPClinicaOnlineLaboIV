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
    }
  }

  