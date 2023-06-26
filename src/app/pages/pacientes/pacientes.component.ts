import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TurnoService } from 'src/app/services/turno.service';
import { Usuario } from 'src/app/clases/usuario';
import { take } from 'rxjs';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent {

  especialistaActual : Usuario | null = null;
  listaUsuariosAtendidos : Usuario[] = [];
  listaDniAtendidos : any[] = [];

  constructor(private userService : UserService, private turnoService : TurnoService){
    this.especialistaActual = this.userService.getCurrentUser();
    console.log(this.especialistaActual);
    this.turnoService.getCollection('turnos').pipe(take(1)).subscribe((turnos) => 
    {
      turnos.forEach((turno) => 
      {
        if(turno.estado == 'realizado' && !this.listaDniAtendidos.includes(turno.dniPaciente))
        {
          this.listaDniAtendidos.push(turno.dniPaciente);
        }
      })
    })

    this.userService.getCollection('usuarios').pipe(take(1)).subscribe((usuarios) => 
    {
      this.listaDniAtendidos.forEach((dniActual) => 
      {
        usuarios.forEach((usuario) => {
          if(dniActual == usuario.dni)
          {
            this.listaUsuariosAtendidos.push(usuario);
          }
        })
      })
    })
    console.log(this.listaDniAtendidos);
    console.log(this.listaUsuariosAtendidos);

  }

  

}
