import { Pipe, PipeTransform } from '@angular/core';
import { Turno } from '../clases/turno';

@Pipe({
  name: 'ordenarPorEspecialidad'
})
export class OrdenarPorEspecialidadPipe implements PipeTransform {

  transform(turnos: Turno[]): Turno[] {
    return turnos.slice().sort((a, b) => {
      return a.especialidad.localeCompare(b.especialidad);
    });
  }

}
