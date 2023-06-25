import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  crearPDFHistoriaClinica(nombreArchivo: string, nombreUsuario: string, data: any[]) {
    const doc = new jsPDF('portrait', 'px', 'a4');
    const image = new Image();
    image.src = "../../assets/logo.png";
    doc.text("HISTORIA CLINICA DE " + nombreUsuario, 140, 70);
    const fecha = (new Date()).toLocaleString();
    doc.addImage(image, 'PNG', 10, 10, 120, 120);
    doc.text("Fecha de creación: " + fecha, 200, 20);
  
    let posicion = 120;
    const maxPosicion = doc.internal.pageSize.getHeight() - 30; 
  
    data.forEach(item => {
      if (posicion + 60 > maxPosicion) { 
        doc.addPage(); 
        posicion = 40; 
      }
  
      doc.text("Fecha: " + item.fecha, 35, posicion += 15);
      doc.text("Altura: " + item.altura + "cm", 35, posicion += 15);
      doc.text("Peso: " + item.peso + "Kg", 35, posicion += 15);
      doc.text("Presion: " + item.presion, 35, posicion += 15);
      doc.text("Temperatura: " + item.temperatura + "°C", 35, posicion += 15);
      doc.text("Reseña: " + item.resenia, 35, posicion += 15);
      if (item.dato1 != undefined) {
        doc.text(item.dato1[0] + ": " + item.dato1[1], 35, posicion += 15);
      }
      if (item.dato2 != undefined) {
        doc.text(item.dato2[0] + ": " + item.dato2[1], 35, posicion += 15);
      }
      if (item.dato3 != undefined) {
        doc.text(item.dato3[0] + ": " + item.dato3[1], 35, posicion += 15);
      }
      posicion += 30;
    });
  
    doc.save(nombreArchivo);
  }
  
}
