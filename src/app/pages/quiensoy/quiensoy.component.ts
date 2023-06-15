import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quiensoy',
  templateUrl: './quiensoy.component.html',
  styleUrls: ['./quiensoy.component.css']
})
export class QuiensoyComponent {

  myProfile : any = null;

  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    this.http.get('https://api.github.com/users/FedericoMS').subscribe((res: any) => {
        this.myProfile = res;
      });
  }

}
