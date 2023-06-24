import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  swalert(title : string, text : string, icon : SweetAlertIcon, confirmButtonText : string = 'Ok')
  {
    Swal.fire(
      {
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: confirmButtonText
      }
    )
  }

  showToast(title: string, icon: SweetAlertIcon = 'success',  color : string = "white", timer: number = 2000): void {
    Swal.fire({
      title,
      icon,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      background: color,
      timer
    });
  }

  showModal(title: string, text: string, title2: string, text2: string, callback: () => void, icon: SweetAlertIcon = 'warning', icon2: SweetAlertIcon = 'success'): void {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: "No"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: title2,
          text: text2,
          icon: icon2
        }).then(() => {
          callback(); // Ejecuta la función de callback proporcionada
        });
      }
    });
  }

  showModalText(
    title: string,
    text: string,
    placeholder: string,
    callback: (text: string) => void,
    icon: SweetAlertIcon = 'warning'
  ): void {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      input: 'textarea',
      inputPlaceholder: placeholder,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const inputValue = (result.value as string).trim();
        callback(inputValue);
      }
    });
  }

  showModalWithInputs(callback: (datos: any) => void): void {
    Swal.fire({
      title: 'Ingrese los datos',
      html:
        '<textarea id="resenia" class="swal2-textarea" placeholder="Escriba aquí su reseña"></textarea>' +
        '<input id="altura" type="number" class="swal2-input" placeholder="Altura">' +
        '<input id="peso" type="number" class="swal2-input" placeholder="Peso">' +
        '<input id="temperatura" type="number" class="swal2-input" placeholder="Temperatura">' +
        '<input id="presion" class="swal2-input" placeholder="Presión">' +
        '<input id="dato1_clave" class="swal2-input" placeholder="Dato 1 - Clave (opcional)">' +
        '<input id="dato1_valor" class="swal2-input" placeholder="Dato 1 - Valor (opcional)">' +
        '<input id="dato2_clave" class="swal2-input" placeholder="Dato 2 - Clave (opcional)">' +
        '<input id="dato2_valor" class="swal2-input" placeholder="Dato 2 - Valor (opcional)">' +
        '<input id="dato3_clave" class="swal2-input" placeholder="Dato 3 - Clave (opcional)">' +
        '<input id="dato3_valor" class="swal2-input" placeholder="Dato 3 - Valor (opcional)">',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        return {
          resenia: (document.getElementById('resenia') as HTMLTextAreaElement).value,
          altura: (document.getElementById('altura') as HTMLInputElement).value,
          peso: (document.getElementById('peso') as HTMLInputElement).value,
          temperatura: (document.getElementById('temperatura') as HTMLInputElement).value,
          presion: (document.getElementById('presion') as HTMLInputElement).value,
          dato1_clave: (document.getElementById('dato1_clave') as HTMLInputElement).value,
          dato1_valor: (document.getElementById('dato1_valor') as HTMLInputElement).value,
          dato2_clave: (document.getElementById('dato2_clave') as HTMLInputElement).value,
          dato2_valor: (document.getElementById('dato2_valor') as HTMLInputElement).value,
          dato3_clave: (document.getElementById('dato3_clave') as HTMLInputElement).value,
          dato3_valor: (document.getElementById('dato3_valor') as HTMLInputElement).value
        };
      }
    }).then((result) => {
      if (!result.dismiss && result.value) {
        const datos = result.value;
        callback(datos);
      }
    });
  }
  
  


}
