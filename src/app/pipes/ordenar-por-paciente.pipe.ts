import { Pipe, PipeTransform } from '@angular/core';
import { Turno } from '../clases/turno';

@Pipe({
  name: 'ordenarPorPaciente'
})
export class OrdenarPorPacientePipe implements PipeTransform {

  transform(turnos: Turno[]): Turno[] {
    return turnos.slice().sort((a, b) => {
      return a.paciente.localeCompare(b.paciente);
    });
  }

}
