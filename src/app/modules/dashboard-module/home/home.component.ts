import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/authService/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService) {}

  // hide or show sidebar

  sideBar: boolean = true;

  ngOnInit(): void {
    // remove token when user click back button

    window.onpopstate = () => {
      this.authService.removeToken();
    };
    // remove token when user closes window

    window.onbeforeunload = () => {
      this.authService.removeToken();
    };

    // checking is token is there in localstorage
    if (!localStorage.getItem('token')) {
      
    }
  }

  toogleFunction() {
    this.sideBar = !this.sideBar;
  }
}
