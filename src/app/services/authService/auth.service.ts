import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timer, switchMap, tap } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // isLoggedIn(){
  //   return !! localStorage.getItem('token');
  // }

  removeToken(){
    
    localStorage.removeItem("token");
    localStorage.removeItem("role")
  }

  private refreshTokenInterval: number = 3600000; 
  private refreshToken$: Observable<any>;

  constructor(private http: HttpClient) {
    this.refreshToken$ = timer(0, this.refreshTokenInterval).pipe(
      switchMap(() => this.refreshTokenAndSave())
    );
  }

  refreshTokenAndSave(): Observable<any> {
    return this.refreshToken().pipe(
      tap((newToken) => {
        localStorage.setItem('token', newToken.data.user.accessToken);
      })
    );
  }

  refreshToken(): Observable<any> {
    let token= localStorage.getItem('refreshToken')
  

    const refreshObj={
      "refreshToken":token
    }
    
    
    return this.http.post<any>(environment.baseUrl+"/auth/refresh-token",refreshObj);
  }

  startTokenRefresh(): void {
    this.refreshToken$.subscribe();
  }
}
