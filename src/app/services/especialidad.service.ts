import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, DocumentSnapshot  } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SwalService } from './swal.service';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  constructor(private swal : SwalService, private authFire : AngularFireAuth, private router : Router, private af : AngularFirestore) { }

  getCollection(collectionName: string) {
    const collection = this.af.collection<any>(collectionName);
    return collection.valueChanges();
  }

  setSpecialtyData(data : any, collectionName : string) {
    return this.af.collection(collectionName).add(data);
  }

  updateSpecialty (espMod: any) {
    this.af.doc<any>(`turnos/${espMod.id}`)
      .update(espMod)
      .then(() => {})
      .catch((error) => {
        this.swal.showToast('Error', 'error');
      });
  } 

  createSpecialty(newEsp: any) {
    if (newEsp != null) {
      this.af.collection('especialidades').add({
        id: '', // Esto se ignorará y se generará automáticamente por Firebase
        img: 'https://firebasestorage.googleapis.com/v0/b/clinicaonlinelaboiv.appspot.com/o/_1f096942-b653-41a2-bb3e-1ae8b0a665f0.jpg?alt=media&token=cb0104ba-439e-4bfb-a99f-7b9b42760d2e',
        nombre: newEsp.nombre
      })
        .then((docRef) => {
          const newId = docRef.id; // Obtener el ID del documento recién creado
          console.log("Nuevo ID:", newId);
          return docRef.update({ id: newId }); // Actualizar el documento con el ID generado
        })
        .then(() => {
          this.swal.showToast("Especialidad añadida!");
        })
        .catch((error) => {
          console.log(newEsp);
          this.swal.swalert("Error", error.code, "error");
        });
    }
  }
  
}
