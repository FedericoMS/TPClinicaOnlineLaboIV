import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Especialidad } from 'src/app/clases/especialidad';
import { EspecialidadService } from 'src/app/services/especialidad.service';

@Component({
  selector: 'app-listado-especialidades',
  templateUrl: './listado-especialidades.component.html',
  styleUrls: ['./listado-especialidades.component.css']
})
export class ListadoEspecialidadesComponent {
 
  @Input() listaRecibida : Especialidad[] = [];
  @Output() pasamosUnaEsp : EventEmitter<Especialidad> = new EventEmitter<Especialidad>; 

  constructor(private especialidadService : EspecialidadService)
  {
    
  }

 

  pasarEspecialidad(especialidad : any)
  {
    this.pasamosUnaEsp.emit(especialidad);
  }

}
