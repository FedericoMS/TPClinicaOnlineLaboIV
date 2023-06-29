import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformesComponent } from './informes/informes.component';
import { EsadminGuard } from 'src/app/guards/esadmin.guard';

const routes: Routes = [
  { path: "informes", component: InformesComponent, canActivate : [EsadminGuard] },
  // { path: "informes/logs", component: LogUsuariosComponent },
  // { path: "informes/turnosporespecialidad", component: TurnosPorEspecialidadComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformesRoutingModule { }
