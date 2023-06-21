import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BrowserModule } from '@angular/platform-browser';

import { TurnosRoutingModule } from './turnos-routing.module';
import { SolicitarTurnoComponent } from './solicitar-turno/solicitar-turno.component';


@NgModule({
  declarations: [
    SolicitarTurnoComponent
    
  ],
  imports: [
    CommonModule,
    TurnosRoutingModule,
    // ReactiveFormsModule,
    // FormsModule,
    // BrowserModule
  ]
})
export class TurnosModule { }
