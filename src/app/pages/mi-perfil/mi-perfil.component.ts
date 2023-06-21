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

}
