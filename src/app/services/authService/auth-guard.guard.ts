import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';



export const authGuardGuard: CanActivateFn = (route, state) => {


  if(typeof localStorage !='undefined'){
    const token=localStorage.getItem("token")
    const router =inject(Router)

    if (token){
return true
    }
    else{
      router.navigate([""])
      return false
    }
  }
return false
  


};
