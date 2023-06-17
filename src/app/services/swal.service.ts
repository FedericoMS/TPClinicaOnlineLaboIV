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
  


}
