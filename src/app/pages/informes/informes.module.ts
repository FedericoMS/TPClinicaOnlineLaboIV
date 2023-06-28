import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformesRoutingModule } from './informes-routing.module';
import { InformesComponent } from './informes/informes.component';

import { LogUsuariosComponent } from './log-usuarios/log-usuarios.component';
import { TurnosPorEspecialidadComponent } from './turnos-por-especialidad/turnos-por-especialidad.component';


@NgModule({
  declarations: [
    InformesComponent,
    LogUsuariosComponent,
    TurnosPorEspecialidadComponent
  ],
  imports: [
    CommonModule,
    InformesRoutingModule
  ]
})
export class InformesModule {}
