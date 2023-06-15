import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { UserService } from 'src/app/services/user.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent {

  @Input() listadoRecibido? : Usuario[];
  @Output() PasamosUnUsuario : EventEmitter<Usuario> = new EventEmitter<Usuario>;

  constructor(private userService : UserService, private swal : SwalService){}

  /*
  PasarUsuario(usuario : Usuario)
  {
    this.PasamosUnUsuario.emit(usuario);
    console.info(usuario);
  }*/


  modificarUsuario(usuario: Usuario, opcion: number) {
    if (usuario.perfil == 'especialista') {
      if (opcion == 1) {
        usuario.aprobado = true;
        this.userService.updateUser(usuario);
        this.swal.showToast(
          'Se habilitó al especialista',
          'success'
        );
      } 
      else 
      {
        if (opcion == 2) {
          usuario.aprobado = false;
          this.userService.updateUser(usuario);
          this.swal.showToast(
            'Se deshabilitó al especialista',
            'info'
          );
        }
      }
    }
  }
}