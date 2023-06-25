import { Component } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { UserService } from 'src/app/services/user.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TurnoService } from 'src/app/services/turno.service';
import { Turno } from 'src/app/clases/turno';
import { take } from 'rxjs';
import { SwalService } from 'src/app/services/swal.service';
import { PdfService } from 'src/app/services/pdf.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent {

  usuarioActual : Usuario = new Usuario();
  isLoading : boolean = true;
  listaTurnosPaciente : Turno[] = [];

  constructor(public userService : UserService, private spinner : SpinnerService, private turnoService : TurnoService, private swal : SwalService, private pdfService : PdfService){
    this.spinner.show();
    setTimeout(() => {
      
      
      this.usuarioActual = this.userService.getCurrentUser();
      if(this.usuarioActual.perfil == 'paciente')
      {
        this.turnoService.getCollection('turnos').pipe(take(1)).subscribe((turnos : any) =>
        {
          turnos.forEach((turno : any) => 
          {
            if(turno.dniPaciente == this.usuarioActual.dni && turno.estado == 'realizado')
            {
              this.listaTurnosPaciente.push(turno);
            }
          })
        });
        /*
        this.turnoService.getCollection('turnos').subscribe((turnos : any) => 
        {
          turnos.forEach((turno : any) =>
          {
            if(turno.dniPaciente == this.usuarioActual.dni)
            {
              this.listaTurnosPaciente.push(turno);
            }
          })
        });*/
      }
      // console.log(this.usuarioActual.dni);
      // console.log(this.listaTurnosPaciente);
      this.spinner.hide()
      this.isLoading = false;
      
    }, 3000);
  }



  toggleDay(opcion : number) {
    switch (opcion) {
      case 1:
        this.usuarioActual.dias[1] = !this.usuarioActual.dias[1];
        this.userService.updateUser(this.usuarioActual);
        console.log(this.usuarioActual.dias[1]);
        break;
      case 2:
        this.usuarioActual.dias[2] = !this.usuarioActual.dias[2];
        this.userService.updateUser(this.usuarioActual);
        console.log(this.usuarioActual.dias[2]);
        break;
      case 3:
        this.usuarioActual.dias[3] = !this.usuarioActual.dias[3];
        this.userService.updateUser(this.usuarioActual);
        console.log(this.usuarioActual.dias[3]);
        break;
      case 4:
        this.usuarioActual.dias[4] = !this.usuarioActual.dias[4];
        this.userService.updateUser(this.usuarioActual);
        console.log(this.usuarioActual.dias[4]);
        break;
      case 5:
        this.usuarioActual.dias[5] = !this.usuarioActual.dias[5];
        this.userService.updateUser(this.usuarioActual);
        console.log(this.usuarioActual.dias[5]);
        break;
      case 6:
        this.usuarioActual.dias[6] = !this.usuarioActual.dias[6];
        this.userService.updateUser(this.usuarioActual);
        console.log(this.usuarioActual.dias[6]);
        break;
    }
  }

  descargarPDF()
  {
    this.pdfService.crearPDFHistoriaClinica("Mi Historia Clinica", this.userService.getCurrentFullName(), this.listaTurnosPaciente);
  }

  
  }
