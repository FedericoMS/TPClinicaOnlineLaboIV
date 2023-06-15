import { Component } from '@angular/core';
import { SwalService } from 'src/app/services/swal.service';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from 'src/app/clases/usuario';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  isLoading : boolean = true;
  user: Usuario;
  boolFormPac : boolean;
  boolFormEsp : boolean;
  boolFormAdmin : boolean;
  img_paciente : string = "../../../assets/patient.jpg";
  img_doctor : string = "../../../assets/doctor.jpg";
  currentProfile : string = '';


  constructor(private userService: UserService, private router: Router, private swal : SwalService, private spinner : SpinnerService) {
    this.user = new Usuario;
    this.currentProfile = this.userService.getCurrentProfile();
    this.boolFormPac  = false;
    this.boolFormEsp  = false;
    this.boolFormAdmin  = false;
  }

  ngOnInit(): void {
    this.spinner.show()
    setTimeout(() => {
      this.spinner.hide()
      this.isLoading = false;
      
    }, 1000);
  }

  





/*

  register() {
    if (this.user.email == '' || this.user.clave == '') {
      this.swal.swalert("Error", "Campos vacíos", "error");
    }
    else {
      if (!this.userService.checkEmail(this.user.email)) {
        this.swal.swalert("Error", "Email inválido", "error");
      }

      else {
        this.userService.createUser({ email: this.user.email, password: this.user.clave })
          .then(() => {
            this.swal.swalert("Registro", "Usuario registrado", "success");
            this.router.navigateByUrl("/home");
          })
          .catch((error) => {
            if (error.code == 'auth/email-already-in-use') {
              this.swal.swalert("Error", "El mail ya está en uso", "error");
            }
            else if (error.code == 'auth/weak-password') {
              this.swal.swalert("Error", "La contraseña debe tener al menos 6 caracteres", "error");
            }
            else {
              this.swal.swalert("Error", "No se pudo registrar", "error");
            }
          });
      }
    }
  }*/

}
