import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformesComponent } from './informes/informes.component';
import { LogUsuariosComponent } from './log-usuarios/log-usuarios.component';
import { TurnosPorEspecialidadComponent } from './turnos-por-especialidad/turnos-por-especialidad.component';
const routes: Routes = [
  { path: "informes", component: InformesComponent },
  // { path: "informes/logs", component: LogUsuariosComponent },
  // { path: "informes/turnosporespecialidad", component: TurnosPorEspecialidadComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformesRoutingModule { }
