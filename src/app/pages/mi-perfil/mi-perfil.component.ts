import { Component } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { UserService } from 'src/app/services/user.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent {

  usuarioActual : Usuario = new Usuario();
  isLoading : boolean = true;
  
  lunes : boolean = false;
  martes : boolean = false;
  miercoles : boolean = false;
  jueves : boolean = false;
  viernes : boolean = false;
  sabado : boolean = false;

  constructor(public userService : UserService, private spinner : SpinnerService){
    this.spinner.show();
    setTimeout(() => {
      this.usuarioActual = this.userService.getCurrentUser();
      this.spinner.hide()
      this.isLoading = false;
      
    }, 2500);
  }

  ngOnInit(){
    
  }

  toggleDay(opcion : number) {
    switch (opcion) {
      case 1:
        this.lunes = !this.lunes;
        this.usuarioActual.dias[1] = this.lunes;
        this.userService.updateUser(this.usuarioActual);
        console.log(this.usuarioActual.dias[1]);
        break;
      case 2:
        this.martes = !this.martes;
        this.usuarioActual.dias[2] = this.martes;
        console.log(this.usuarioActual.dias[2]);
        break;
      case 3:
        this.miercoles = !this.miercoles;
        this.usuarioActual.dias[3] = this.miercoles;
        console.log(this.usuarioActual.dias[3]);
        break;
      case 4:
        this.jueves = !this.jueves;
        this.usuarioActual.dias[4] = this.jueves;
        console.log(this.usuarioActual.dias[4]);
        break;
      case 5:
        this.viernes = !this.viernes;
        this.usuarioActual.dias[5] = this.viernes;
        console.log(this.usuarioActual.dias[5]);
        break;
      case 6:
        this.sabado = !this.sabado;
        this.usuarioActual.dias[6] = this.sabado;
        console.log(this.usuarioActual.dias[6]);
        break;
    }
  }
  
  }
