import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification  } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore, DocumentSnapshot  } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SwalService } from './swal.service';
import { Observable, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Usuario } from '../clases/usuario';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  user$ : any;
  public isLoggedIn : any = false;
  private userName : string = '';
  private userProfile : string = '';
  private isApproved : boolean = false;
  public isAdmin : boolean = false;
 // private dniActual : number = 0;
//  private nombreCompletoActual : string = '';
  private usuarioActual : Usuario = new Usuario();

  constructor(private swal : SwalService, private auth : Auth, private authFire : AngularFireAuth, private router : Router, private af : AngularFirestore) 
  { 

    this.user$ = this.authFire.authState.subscribe(async (user) => {
       if(user != null && user != undefined && user.emailVerified)
       {
         const userProfileSnapshot: any = await this.getUserProfile(user.uid).toPromise();
         if (userProfileSnapshot.exists) {
           const userProfileData = userProfileSnapshot.data();
           this.usuarioActual = userProfileData;
          // console.log(this.usuarioActual);
           this.userProfile = this.usuarioActual.perfil;
          // this.isApproved = userProfileData.aprobado;
          // this.dniActual = userProfileData.dni;
          // this.nombreCompletoActual = userProfileData.nombre + ' ' + userProfileData.apellido;

           //console.log(this.dniActual);
           //console.log(this.nombreCompletoActual);

           console.log("Perfil del usuario: " + this.userProfile);
           if(this.userProfile == "especialista" && this.isApproved)
           {
            console.log("hola, if especialista. Estoy aprobado? " + this.isApproved);
             this.isLoggedIn = user;
           }
           else
           {
            if(this.userProfile != "especialista")
            {
              this.isLoggedIn = user;
            }
            else
            {
              this.isLoggedIn = false;
            }
           }
         }
        let userArray : any = user.email?.split("@");
        this.userName = userArray[0];
        //this.userProfile = user.perfil?;
       // console.log("El email fue verificado? " + user.emailVerified);
        console.log("Hola, soy el usuario: " + this.userName);
        // Obtener datos del perfil del usuario
       // console.log("línea final: " + this.isLoggedIn)
      }
      
      console.log("Hola, soy el usuario con el mail: " + user?.email);
    });
  }

    createUser(newUser : any)
  {
    return createUserWithEmailAndPassword(this.auth, newUser.email, newUser.clave)
        .then((data) => 
        {
          if(data != null)
          {
            console.log("hola, estoy en create user");
            sendEmailVerification(data.user); //chequear esto
            this.af
            .collection('usuarios')
            .doc(data.user?.uid)
            .set({
              id: data.user?.uid,
              perfil: newUser.perfil,
              nombre: newUser.nombre,
              apellido: newUser.apellido,
              edad: newUser.edad,
              dni: newUser.dni,
              obraSocial: newUser.obraSocial,
              especialidad: newUser.especialidad,
              email: newUser.email,
              clave: newUser.clave,
              imagen1: newUser.imagen1,
              imagen2: newUser.imagen2,
              aprobado: newUser.aprobado,
            })
            .then(() => 
            {
              this.swal.swalert("Registro exitoso!", "Revisa tu correo", "success");
            })
            .catch((error) => {
              this.swal.swalert("Error", error.code, "error");
            });
        }
      });
    }


    //Usuario sin verificar: fawoja5018@ratedane.com, 123456

    async login({ email, password }: any) {
      try {
        await signInWithEmailAndPassword(this.auth, email, password);
        const user: any = this.auth.currentUser;
       // await user.reload(); // Recargar los datos del usuario
        if (user.emailVerified) {
          if(this.userProfile == "especialista" && this.isApproved)
          {
            this.isLoggedIn = true;
          }
          else
          {
            if(this.userProfile == "paciente")
            {
              this.isLoggedIn = true;
            }
            else
            {
              this.isLoggedIn = true;
              this.userProfile = 'admin';
            }
          }
        } else {
          this.isLoggedIn = false;
          throw new Error('El usuario no ha verificado su correo electrónico.');
        }
      } catch (err) {
        throw err;
      }
    }
  

 /* async login({email , password} : any ){
    return await signInWithEmailAndPassword(this.auth, email, password)
                                      .then((userCredential) => {
                                        this.isLoggedIn = true; //SI HAY ALGÚN PROBLEMA CON EL LOGIN, DESCOMENTAR ESTA LÍNEA
                                        console.log(userCredential.user);
                                        const user : any = userCredential.user;
                                        this.userProfile = user.perfil;
                                        // if (user.perfil === 'admin') 
                                        // {
                                        //   this.userProfile = user.perfil;
                                        // }
                                        console.log(user.perfil);
                                      })
                                      .catch((err) =>{
                                        throw err
                                      });
  }*/
  
  checkEmail(email : string) {
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regex.test(email)) {
      return true;
    }
    else {
      return false;
    }
  }

  logout(){
    this.auth.signOut();
    this.router.navigateByUrl('/login');
    this.swal.showToast("Sesión cerrada", "success");
    this.isLoggedIn = false;
    this.userProfile = '';
    console.log("Sesión cerrada");
  }


  setUserData(data : any, collectionName : string) {
    return this.af.collection(collectionName).add(data);
  }

  getUserName()
  {
    return this.userName;
  }

  crearMensaje(error: any): string {
    let mensaje: string = '';
    switch (error) {
      case 'auth/operation-not-allowed':
        mensaje = 'La operación no está permitida.';
        break;
      case 'auth/email-already-in-use':
        mensaje = 'El email ya está registrado.';
        break;
      case 'auth/weak-password':
        mensaje = 'La contraseña debe tener al menos 6 caracteres';
        break;
      case 'auth/invalid-email':
        mensaje = 'El email no es valido.';
        break;
      case 'auth/internal-error':
        mensaje = 'Los campos estan vacios';
        break;
      case 'auth/user-not-found':
        mensaje = 'El email y/o la contraseña son incorrectas';
        break;
      default:
        mensaje = 'Error al crear el usuario.';
        break;
    }

    return mensaje;
  }


  updateUser(userMod: any) {
    this.af.doc<any>(`usuarios/${userMod.id}`)
      .update(userMod)
      .then(() => {})
      .catch((error) => {
        this.swal.showToast('Error', 'error');
      });
  } 
  
  getCollection(collectionName: string) {
    const collection = this.af.collection<any>(collectionName);
    return collection.valueChanges();
  }

  getUserProfile(userId: string) {
    return this.af.collection('usuarios').doc(userId).get();
  }

 getCurrentProfile() : string
  {
    return this.usuarioActual.perfil;
  }

  getCurrentDNI() : number
  {
    return this.usuarioActual.dni;
  }

  getCurrentFullName() : string
  {
    return this.usuarioActual.apellido + ' ' + this.usuarioActual.nombre;
  }

  getCurrentUser() : Usuario
  {
    return this.usuarioActual;
  }

}
