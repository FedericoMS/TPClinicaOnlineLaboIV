import { Component, Input } from '@angular/core';
import { Turno } from 'src/app/clases/turno';

@Component({
  selector: 'app-historiales',
  templateUrl: './historiales.component.html',
  styleUrls: ['./historiales.component.css']
})
export class HistorialesComponent {

  @Input() listaRecibida : Turno[] = [];

  constructor(){}

}
