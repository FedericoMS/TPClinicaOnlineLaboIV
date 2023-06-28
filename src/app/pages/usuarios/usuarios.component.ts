import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from 'src/app/clases/usuario';
import { SwalService } from 'src/app/services/swal.service';
import { Router } from '@angular/router';
import { TurnoService } from 'src/app/services/turno.service';
import { take } from 'rxjs';
import { Turno } from 'src/app/clases/turno';
import * as XLSX from "xlsx"




@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  listaUsuarios : Usuario[] = [];
  listaTurnosUsuarioElegido : Turno[] = [];
  usuario : any = '';

  lista : any[] = [];

  constructor(private userService : UserService, private swal : SwalService, private router : Router, private turnoService : TurnoService){}

  ngOnInit(): void 
  {
    this.userService.getCollection('usuarios').subscribe((usuarios) => {
      this.listaUsuarios = usuarios;
      console.log(this.listaUsuarios);
    });

    /*this.turnoService.getCollection('turnos').pipe(take(1)).subscribe((turnos : any) =>
    {
      this.listaTurnos = turnos;
    });*/
  }

  irARegistro()
  {
    this.router.navigateByUrl('/registro');
  }
  
  async tomarUsuarioParaExcel($events: any) {
    this.usuario = $events;
    if (this.usuario.perfil == 'paciente' || this.usuario.perfil == 'admin') {
      this.listaTurnosUsuarioElegido = await this.turnoService.getTurnosUsuario($events);
    }
    else {
      this.listaTurnosUsuarioElegido = await this.turnoService.getTurnosEspecialista($events);
    }
    this.listaTurnosUsuarioElegido.forEach(turno => {
      let obj = {
        'Fecha': turno.fecha,
        'Hora': turno.hora,
        'Paciente': turno.paciente,
        'Especialista': turno.especialista,
        'Especialidad': turno.especialidad
      };
      this.lista.push(obj);
    })

    var ws = XLSX.utils.json_to_sheet(this.lista);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, this.usuario.email);
    XLSX.writeFile(wb, this.usuario.email + ".xlsx");
    this.lista = [];
  }

  descargarUsuarios() {

    var ws = XLSX.utils.json_to_sheet(this.listaUsuarios);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Usuarios");
    XLSX.writeFile(wb, "Usuarios.xlsx");
  }




}
