import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Turno } from 'src/app/clases/turno';

@Component({
  selector: 'app-historiales',
  templateUrl: './historiales.component.html',
  styleUrls: ['./historiales.component.css']
})
export class HistorialesComponent {

  @Input() listaTurnosRecibida : Turno[] = [];

  listaTurnos : any[]=[]
  @ViewChild('historiaClinicaModal') historiaClinicaModal!: ElementRef;

  constructor() { }

  openModal() {
    this.historiaClinicaModal.nativeElement.classList.add('show');
    this.historiaClinicaModal.nativeElement.style.display = 'block';
  }

  closeModal() {
    this.historiaClinicaModal.nativeElement.classList.remove('show');
    this.historiaClinicaModal.nativeElement.style.display = 'none';
  }


}
