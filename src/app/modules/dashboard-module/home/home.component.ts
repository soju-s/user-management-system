import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/authService/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private authService:AuthService) {}

  // hide or show sidebar

  sideBar: boolean = true;

  ngOnInit(): void {

   // Start token refresh process when the application initializes
   this.authService.startTokenRefresh();
   
  }

  //  Toggle Side Bar Functionality
  toogleFunction() {
    this.sideBar = !this.sideBar;
  }


}
