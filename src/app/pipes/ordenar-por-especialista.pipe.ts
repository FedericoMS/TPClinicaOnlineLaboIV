import { Pipe, PipeTransform } from '@angular/core';
import { Turno } from '../clases/turno';

@Pipe({
  name: 'ordenarPorEspecialista'
})
export class OrdenarPorEspecialistaPipe implements PipeTransform {

  transform(turnos: Turno[]): Turno[] {
    return turnos.slice().sort((a, b) => {
      return a.especialista.localeCompare(b.especialista);
    });
  }

}
