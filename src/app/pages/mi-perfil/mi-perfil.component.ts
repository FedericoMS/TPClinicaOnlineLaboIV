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
  
  lunes : boolean = true;
  martes : boolean = true;
  miercoles : boolean = true;
  jueves : boolean = true;
  viernes : boolean = true;
  sabado : boolean = true;

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

  activarDia(opcion : number) {
    switch (opcion) {
      case 1:
        this.lunes = !this.lunes;
        break;
      case 2:
        this.martes = !this.martes;
        break;
      case 3:
        this.miercoles = !this.miercoles;
        break;
      case 4:
        this.jueves = !this.jueves;
        break;
      case 5:
        this.viernes = !this.viernes;
        break;
      case 6:
        this.sabado = !this.sabado;
        break;
    }
  }
  
  }
