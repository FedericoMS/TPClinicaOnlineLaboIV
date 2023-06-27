import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TurnoService } from 'src/app/services/turno.service';
import { Usuario } from 'src/app/clases/usuario';
import { take } from 'rxjs';
import { Turno } from 'src/app/clases/turno';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent {

  especialistaActual : Usuario | null = null;
  listaUsuariosAtendidos : any[] = [];
  listaDniAtendidos : any[] = [];
  isLoggedIn : boolean = this.userService.getIsLoggedIn();
  
  listaTurnosRealizados : Turno[] = [];

  constructor(private userService : UserService, private turnoService : TurnoService){}

  ngOnInit(): void {
    this.especialistaActual = this.userService.getCurrentUser();

    // Combinar las solicitudes de turnos y usuarios
    forkJoin([
      this.turnoService.getCollection('turnos').pipe(take(1)),
      this.userService.getCollection('usuarios').pipe(take(1))
    ]).subscribe(([turnos, usuarios]) => {
      this.listaTurnosRealizados = turnos.filter((turno: Turno) => turno.estado === 'realizado' && turno.dniEspecialista === this.especialistaActual!.dni);

      const dniPacientesAtendidos = this.listaTurnosRealizados.map((turno: Turno) => turno.dniPaciente);
      this.listaUsuariosAtendidos = usuarios.filter((usuario: Usuario) => dniPacientesAtendidos.includes(usuario.dni));
      
      this.listaTurnosRealizados.sort((a: Turno, b: Turno) => {
        const fechaA = this.getFechaOrdenable(a.fecha!);
        const fechaB = this.getFechaOrdenable(b.fecha!);
        return fechaB - fechaA;
      });
      
      this.listaUsuariosAtendidos.forEach((usuario: any) => {
        usuario.turnos = [...this.listaTurnosRealizados.filter((turno: Turno) => turno.dniPaciente === usuario.dni)];
      });


      console.log(this.listaTurnosRealizados);
      console.log(this.listaUsuariosAtendidos);
    });
  }

  private getFechaOrdenable(fecha: string): number {
    const partes = fecha.split('/');
    const dia = parseInt(partes[0]);
    const mes = parseInt(partes[1]);
    return mes * 100 + dia;
  }
  

  

}
