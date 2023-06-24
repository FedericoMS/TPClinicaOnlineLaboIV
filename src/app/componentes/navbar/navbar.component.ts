import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  user : any = {};
  profilePicDefault : string = '../../../assets/defaultProfile.jpg';

  constructor(private router : Router, public userService : UserService) {  
  
   }
}
