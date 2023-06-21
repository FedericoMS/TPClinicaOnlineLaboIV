import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
import { SolicitarTurnoComponent } from './solicitar-turno/solicitar-turno.component';


const routes: Routes = [
  { path: "misturnos", component: MisTurnosComponent },
  { path: "solicitarturno", component: SolicitarTurnoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnosRoutingModule { }
