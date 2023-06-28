import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformesRoutingModule } from './informes-routing.module';
import { InformesComponent } from './informes/informes.component';

import { LogUsuariosComponent } from './log-usuarios/log-usuarios.component';
import { TurnosPorEspecialidadComponent } from './turnos-por-especialidad/turnos-por-especialidad.component';
import { NgChartsModule } from 'ng2-charts';
import { TurnosDiariosComponent } from './turnos-diarios/turnos-diarios.component';
import { TurnosSolicitadosPorMedicoComponent } from './turnos-solicitados-por-medico/turnos-solicitados-por-medico.component';

@NgModule({
  declarations: [
    InformesComponent,
    LogUsuariosComponent,
    TurnosPorEspecialidadComponent,
    TurnosDiariosComponent,
    TurnosSolicitadosPorMedicoComponent
  ],
  imports: [
    CommonModule,
    InformesRoutingModule,
    NgChartsModule
  ]
})
export class InformesModule {}
