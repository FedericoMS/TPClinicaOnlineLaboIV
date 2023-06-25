import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, DocumentSnapshot  } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SwalService } from './swal.service';
import { Usuario } from '../clases/usuario';
import { Turno } from '../clases/turno';

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

  createAppointment(nuevoTurno: any) {
    if (nuevoTurno != null) {
      this.af.collection('turnos').add({
        id: '', // Esto se ignorará y se generará automáticamente por Firebase
        fecha: nuevoTurno.fecha,
        hora: nuevoTurno.hora,
        especialista: nuevoTurno.especialista,
        especialidad: nuevoTurno.especialidad,
        paciente: nuevoTurno.paciente,
        resenia: nuevoTurno.resenia,
        encuesta: nuevoTurno.encuesta,
        calificacion: nuevoTurno.calificacion,
        dniPaciente: nuevoTurno.dniPaciente,
        dniEspecialista: nuevoTurno.dniEspecialista,
        estado: nuevoTurno.estado,
        comentarioCancelacion: nuevoTurno.comentarioCancelacion,
      })
        .then((docRef) => {
          const newId = docRef.id; // Obtener el ID del documento recién creado
          console.log("Nuevo ID:", newId);
          return docRef.update({ id: newId }); // Actualizar el documento con el ID generado
        })
        .then(() => {
          this.swal.showToast("Turno creado!");
        })
        .catch((error) => {
          console.log(nuevoTurno);
          this.swal.swalert("Error", error.code, "error");
        });
    }
  }

  getTurnosUsuario(usuario: Usuario) {
    return this.af.collection('turnos').ref.where("dniPaciente", "==", usuario.dni).get()
      .then(snapshots => snapshots.docs.map(doc => {
        const turno: Turno = doc.data() as Turno;
        turno.id = doc.id;
        return turno;
      }));
  }
  

  /*getTurnosUsuario(usuario: Usuario) {
    let listaDeTurnos : Turno[] = [];
    this.af.collection('turnos').ref.where("dniPaciente", "==", usuario.dni).get()
      .then(snapshots => snapshots.docs.map(doc => {
        const turno: Turno = doc.data() as Turno;
        turno.id = doc.id;
        return turno;
      }))
      .then(turnos => {
        console.log(turnos); 
        listaDeTurnos = turnos;
        return listaDeTurnos;
      });
  }*/
  
  


}
