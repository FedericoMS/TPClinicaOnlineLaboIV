import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { QuiensoyComponent } from './pages/quiensoy/quiensoy.component';
import { EsadminGuard } from './guards/esadmin.guard';
import { MisTurnosComponent } from './pages/mis-turnos/mis-turnos.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: "login", component: LoginComponent },
  { path: "registro", component: RegistroComponent },
  { path: "home", component: BienvenidoComponent },
  { path: "quiensoy", component: QuiensoyComponent },
  { path: "misturnos", component: MisTurnosComponent },
  { path: "usuarios", component:  UsuariosComponent,
  canActivate : [EsadminGuard]
     }, //IMPLEMENTAR CANACTIVATE
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
