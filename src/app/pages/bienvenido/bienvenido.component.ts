import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/services/spinner.service';
@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent {

  isLoading : boolean = true;

  constructor(private router : Router, private spinner : SpinnerService)
  {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.isLoading = false;
    }, 300);
  }

  irALogIn()
  {
    try
    {
      this.router.navigateByUrl('/login');
    }
    catch(e : any)
    {
      console.log(e);
    }
  }

  irARegistro()
  {
    try
    {
      this.router.navigateByUrl('/registro');
    }
    catch(e : any)
    {
      console.log(e);
    }
  }
}
