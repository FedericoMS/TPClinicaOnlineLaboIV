import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"; //Para animaciones
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RecaptchaModule, RecaptchaFormsModule  } from 'ng-recaptcha';


//import { FontAwesomeModule, FaIconLibrary  } from '@fortawesome/angular-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

//Firebase
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';



//Componentes 
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
import { SpinnerComponent } from './componentes/spinner/spinner.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { FormAltaPacienteComponent } from './componentes/form-alta-paciente/form-alta-paciente.component';
import { FormAltaEspecialistaComponent } from './componentes/form-alta-especialista/form-alta-especialista.component';
import { FormAltaAdminComponent } from './componentes/form-alta-admin/form-alta-admin.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ListadoUsuariosComponent } from './componentes/listado-usuarios/listado-usuarios.component';
import { QuiensoyComponent } from './pages/quiensoy/quiensoy.component';
import { MisTurnosComponent } from './pages/mis-turnos/mis-turnos.component';
import { OrdenarPorEspecialidadPipe } from './pipes/ordenar-por-especialidad.pipe';
import { OrdenarPorEspecialistaPipe } from './pipes/ordenar-por-especialista.pipe';
import { OrdenarPorPacientePipe } from './pipes/ordenar-por-paciente.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    BienvenidoComponent,
    SpinnerComponent,
    NavbarComponent,
    FormAltaPacienteComponent,
    FormAltaEspecialistaComponent,
    FormAltaAdminComponent,
    UsuariosComponent,
    ListadoUsuariosComponent,
    QuiensoyComponent,
    MisTurnosComponent,
    OrdenarPorEspecialidadPipe,
    OrdenarPorEspecialistaPipe,
    OrdenarPorPacientePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    AngularFireModule,
    AngularFirestoreModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    provideStorage(() => getStorage()) 
  ],
  /*  providers: [
  //  ScreenTrackingService,UserTrackingService
  { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
  ],*/
  providers: [ { provide: FIREBASE_OPTIONS, useValue: environment.firebase } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
