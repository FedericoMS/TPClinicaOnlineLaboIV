import { Component } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { UserService } from 'src/app/services/user.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TurnoService } from 'src/app/services/turno.service';
import { Turno } from 'src/app/clases/turno';
import { take } from 'rxjs';
import { SwalService } from 'src/app/services/swal.service';
import { PdfService } from 'src/app/services/pdf.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent {

  usuarioActual : Usuario = new Usuario();
  isLoading : boolean = true;
  listaTurnosPaciente : Turno[] = [];
  filtroEspecialidad: string = '';
  listaEspecialidades : string[] = [];

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
          this.crearListaEspecialidades();
         
        });

      }

      this.spinner.hide()
      this.isLoading = false;
      
    }, 3000);
  }


  crearListaEspecialidades()
  {
    this.listaEspecialidades = this.listaTurnosPaciente
    .filter((turno: any) => !this.listaEspecialidades.includes(turno.especialidad))
    .map((turno: any) => turno.especialidad);
    const especialidadesUnicas = [...new Set(this.listaTurnosPaciente.map((turno: any) => turno.especialidad))];
    this.listaEspecialidades = especialidadesUnicas;  
    console.log(this.listaEspecialidades);

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
    this.pdfService.crearPDFHistoriaClinica("Historia Clinica de " + this.userService.getCurrentFullName(), this.userService.getCurrentFullName(), this.listaTurnosPaciente);
  }

  filtrarTurnosPorEspecialidad(especialidad : string) {
    if (especialidad === '') {
      this.swal.swalert("Error", 'Debe ingresar una especialidad para filtrar los turnos.', 'error')
      return;
    }
    
    const turnosFiltrados = this.listaTurnosPaciente.filter(turno => turno.especialidad == especialidad);
    if (turnosFiltrados.length === 0) {
      this.swal.swalert("Error", `No se encontraron turnos con la especialidad ${especialidad}.`, 'error')
      return;
    }
    
    try
    {
      this.pdfService.crearPDFHistoriaClinica("Historia Clínica " + especialidad, this.userService.getCurrentFullName(), turnosFiltrados);
      this.swal.showToast('Historia descargada!', 'success');
    }
    catch(e){
      this.swal.swalert("Error", 'Ocurrió un error', 'error');
      console.log(e);
    }
  }



  
  }
