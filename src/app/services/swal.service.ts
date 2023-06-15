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


}
