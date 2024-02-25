import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn(){
    return !! localStorage.getItem('token');
  }

  removeToken(){
    
    localStorage.removeItem("token");
    localStorage.removeItem("role")
  }
}
