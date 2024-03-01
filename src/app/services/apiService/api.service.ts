import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  
  constructor(private api:HttpClient){}



  post(data:any,apiLink:any,header?:any){
    return this.api.post(environment.baseUrl+apiLink,data,{headers:header}).pipe(
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

  // to list all user

  get(apiLink:any,header:any){
    return this.api.get(environment.baseUrl+apiLink,{headers:header});
  }

  // delete user

  delete(id:any,apiLink:any,header:any){
    return this.api.delete(environment.baseUrl+apiLink+id,{headers:header})
  }


  put(apiLink:any,data:any,header:any){
    return this.api.put(environment.baseUrl+apiLink,data,{headers:header})
  }

}
