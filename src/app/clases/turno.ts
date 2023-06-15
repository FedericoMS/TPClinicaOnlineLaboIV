export class Turno {
    fecha: string;
    hora: string; //de 8 a 19hs de l a v. Sábados de 8 a 14hs
    especialista: string; //Apellido + nombre
    especialidad: string;
    paciente: string; //Apellido + nombre
    reseña: string; //la da el especialista. El historial clínico es un conjunto de todas las reseñas de UN paciente
    encuesta: string; //la da el paciente
    calificacion: number; //la da el paciente

    constructor()
     {
        this.fecha = '';
        this.hora = ''
        this.especialista = ''
        this.especialidad = ''
        this.paciente = ''
        this.reseña = '';
        this.encuesta = '';
        this.calificacion = 0;
    }

}