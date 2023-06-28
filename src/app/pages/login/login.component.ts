import { Component } from '@angular/core';
import { SwalService } from 'src/app/services/swal.service';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from 'src/app/clases/usuario';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isLoading : boolean = true;
  user : Usuario;
  listaDeUsuarios : Usuario[] = [];
  pacientes: any[] = [];        
  especialistas: any[] = [];    
  admins: any[] = [];          

  constructor(private userService: UserService, private router: Router, private swal: SwalService, private spinner : SpinnerService) {
    this.user = new Usuario;
    this.spinner.show();
    this.userService.getCollection('usuarios').subscribe
      (async (usuarios) => {
        this.listaDeUsuarios = usuarios;
    //    console.log(this.listaDeUsuarios);
        this.listaDeUsuarios.forEach((usuario) => {
          if (usuario.perfil == 'paciente') {
            this.pacientes.push(usuario);
          }
          else {
            if (usuario.perfil == "especialista") {
              this.especialistas.push(usuario);
            }
            else {
              if (usuario.perfil == "admin") {
                this.admins.push(usuario);
              }
            }
          }
        })
        this.spinner.hide();
        this.isLoading = false;
      //   console.log(this.pacientes);
      // console.log(this.especialistas);
      // console.log(this.admins);
    })
    
  }

  ngOnInit(): void {
    
  }

  loginUser() {
    if (this.user.email == '' || this.user.clave == '') {
      this.swal.swalert("Error", "Campos vacíos", "error");
      
    }
    else
    {
      this.userService.login({email : this.user.email, password : this.user.clave})
      .then(() => {
        let date = new Date();
        this.userService.setUserData({Fecha : this.getDateFormat(date), Hora : this.getDateHour(date), Usuario : this.user.email}, "datos de ingresos")
        this.swal.swalert("Bienvenido", "Bienvenido a la Clínica Online", "success");
        this.router.navigateByUrl('/home');
      })
      .catch((err) => { 
        this.swal.swalert("Error", this.userService.crearMensaje(err.code), "error");
        console.log(err.code);
      });

      
    } 
  }


  /* CÓDIGO ORIGINAL
  loginUser() {
    if (this.user.email == '' || this.user.clave == '') {
      this.swal.swalert("Error", "Campos vacíos", "error");
      
    }
    else
    {
      this.userService.login({email : this.user.email, password : this.user.clave})
      .then(() => {
        let date = new Date();
        this.userService.setUserData({Fecha : this.getDateFormat(date), Usuario : this.user.email}, "datos de ingresos")
        this.swal.swalert("Bienvenido", "Bienvenido a la Clínica Online", "success");
        this.router.navigateByUrl('/home');
      })
      .catch((err) => { 
        this.swal.swalert("Error", this.userService.crearMensaje(err.code), "error");
        console.log(err.code);
      });

      
    } 
  }*/

  getDateFormat(date: Date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  getDateHour (date: Date): string {
    const hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formatHours = (hours % 12) || 12;
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${formatHours}:${minutes} ${ampm}`;
  }
  

  
  fastLogin() {
    this.user.email = 'invitado@invitado.com';
    this.user.clave = '123456';
  }

  cargarUsuario(email : string, clave : string) {
    this.user.email = email;
    this.user.clave = clave;
    this.swal.showToast("Se cargó el usuario!", "info");
  }

}
