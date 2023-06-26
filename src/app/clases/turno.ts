export class Turno {
    id : string;
    fecha: string | undefined;
    hora: string | undefined; //de 8 a 19hs de l a v. Sábados de 8 a 14hs
    especialista: string; //Apellido + nombre
    especialidad: string;
    paciente: string; //Apellido + nombre
    resenia: string; //la da el especialista. El historial clínico es un conjunto de todas las resenias de UN paciente
    encuesta: string; //la da el paciente
    calificacion: string; //la da el paciente
    dniPaciente : number; //se debe tomar automáticamente
    dniEspecialista : number; //se debe tomar automáticamente
    estado : string; //Los estados son: solicitado, realizado, cancelado, rechazado
    comentarioCancelacion : string; //Decidí poner 1 sólo campo de comentario de cancelación o rechazo, ya que en teoría solamente debe comentar el que lo cancela/rechaza.
    altura : number = 0;
    peso : number = 0;
    presion : string = '';
    temperatura : number = 0;
    dato1 : any = '';
    dato2 : any = '';
    dato3 : any = '';

    constructor()
     {
        this.id = '';
        this.fecha = '';
        this.hora = '';
        this.especialista = '';
        this.especialidad = '';
        this.paciente = ''
        this.resenia = '';
        this.encuesta = '';
        this.calificacion = '';
        this.dniEspecialista = 0;
        this.dniPaciente = 0;
        this.estado = '';
        this.comentarioCancelacion = '';
    }

}
