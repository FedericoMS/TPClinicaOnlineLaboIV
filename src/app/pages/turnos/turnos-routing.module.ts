import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
import { SolicitarTurnoComponent } from './solicitar-turno/solicitar-turno.component';
import { EstaloggeadoGuard } from 'src/app/guards/estaloggeado.guard';


const routes: Routes = [
  { path: "misturnos", component: MisTurnosComponent, 
    canActivate: [EstaloggeadoGuard] },
  { path: "solicitarturno", component: SolicitarTurnoComponent, 
    canActivate: [EstaloggeadoGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnosRoutingModule { }
