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

}
