import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from 'src/app/clases/usuario';
import { SwalService } from 'src/app/services/swal.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  listaUsuarios : Usuario[] = [];

  constructor(private userService : UserService, private swal : SwalService, private router : Router){}

  ngOnInit(): void 
  {
    this.userService.getCollection('usuarios').subscribe((usuarios) => {
      this.listaUsuarios = usuarios;
      console.log(this.listaUsuarios);
    });
  }

  irARegistro()
  {
    this.router.navigateByUrl('/registro');
  }


}
