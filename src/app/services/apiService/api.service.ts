import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  
  constructor(private api:HttpClient){}

  post(data:any,apiLink:any){
    return this.api.post(environment.baseUrl+apiLink,data).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          // return throwError('An error occurred:', error.error.message);
        } else {
          // Server-side error
         return throwError(error);
        }
        return throwError('Something bad happened; please try again later.');
      })
    );
    
  }


}
