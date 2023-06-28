import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformesRoutingModule } from './informes-routing.module';
import { InformesComponent } from './informes/informes.component';

import { LogUsuariosComponent } from './log-usuarios/log-usuarios.component';
import { TurnosPorEspecialidadComponent } from './turnos-por-especialidad/turnos-por-especialidad.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    InformesComponent,
    LogUsuariosComponent,
    TurnosPorEspecialidadComponent
  ],
  imports: [
    CommonModule,
    InformesRoutingModule,
    NgChartsModule
  ]
})
export class InformesModule {}
