import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { QuiensoyComponent } from './pages/quiensoy/quiensoy.component';
import { EsadminGuard } from './guards/esadmin.guard';
import { MiPerfilComponent } from './pages/mi-perfil/mi-perfil.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { EsEspecialistaGuard } from './guards/es-especialista.guard';
import { EstaloggeadoGuard } from './guards/estaloggeado.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: "login", component: LoginComponent, data: {animation: 'login'} },
  { path: "registro", component: RegistroComponent, data: {animation: 'registro'} },
  { path: "home", component: BienvenidoComponent,  data: {animation: 'home'} },
  { path: "quiensoy", component: QuiensoyComponent, data: {animation: 'quiensoy'} },
  { path: "perfil", component: MiPerfilComponent, 
     canActivate: [EstaloggeadoGuard]},
  { path: "pacientes", component: PacientesComponent,
    canActivate: [EsEspecialistaGuard] },
  {
    path: 'turnos', loadChildren: () => import('./pages/turnos/turnos.module')
      .then(mod => mod.TurnosModule)
  },
  { path: "usuarios", component:  UsuariosComponent,
  canActivate : [EsadminGuard]
     }, //IMPLEMENTAR CANACTIVATE
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
