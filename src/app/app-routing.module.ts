import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { EsadminGuard } from './guards/esadmin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: "login", component: LoginComponent },
  { path: "registro", component: RegistroComponent },
  { path: "home", component: BienvenidoComponent },
  { path: "usuarios", component:  UsuariosComponent,
  canActivate : [EsadminGuard]
     }, //IMPLEMENTAR CANACTIVATE
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
