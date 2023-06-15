import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent {

  constructor(private router : Router){}

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
