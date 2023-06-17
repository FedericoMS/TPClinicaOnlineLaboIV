import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, DocumentSnapshot  } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SwalService } from './swal.service';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  constructor(private swal : SwalService, private authFire : AngularFireAuth, private router : Router, private af : AngularFirestore) {}

  getCollection(collectionName: string) {
    const collection = this.af.collection<any>(collectionName);
    return collection.valueChanges();
  }

  setAppointmentData(data : any, collectionName : string) {
    return this.af.collection(collectionName).add(data);
  }

  updateAppointment (turnoMod: any) {
    this.af.doc<any>(`turnos/${turnoMod.id}`)
      .update(turnoMod)
      .then(() => {})
      .catch((error) => {
        this.swal.showToast('Error', 'error');
      });
  } 


  createAppointment(newAppointment: any) { //CORREGIRRRRRRRRRRRRRRR

    if (newAppointment != null) {
      console.log("hola, estoy en create turno");
      this.af
        .collection('turnos')
        .doc(newAppointment?.uid)
        .set({
          id: newAppointment?.uid,
          perfil: newAppointment.perfil,
          nombre: newAppointment.nombre,
          apellido: newAppointment.apellido,
          edad: newAppointment.edad,
          dni: newAppointment.dni,
          obraSocial: newAppointment.obraSocial,
          especialidad: newAppointment.especialidad,
          email: newAppointment.email,
          clave: newAppointment.clave,
          imagen1: newAppointment.imagen1,
          imagen2: newAppointment.imagen2,
          aprobado: newAppointment.aprobado,
        })
        .then(() => {
          this.swal.swalert("Registro exitoso!", "Revisa tu correo", "success");
        })
        .catch((error) => {
          this.swal.swalert("Error", error.code, "error");
        });
    }
  }


}
