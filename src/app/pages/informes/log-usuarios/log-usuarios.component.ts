import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-log-usuarios',
  templateUrl: './log-usuarios.component.html',
  styleUrls: ['./log-usuarios.component.css']
})
export class LogUsuariosComponent {

  @Input() listadoRecibido : any[] = [];



}
