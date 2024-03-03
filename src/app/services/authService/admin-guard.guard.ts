import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CommonService } from '../commonService/common.service';


export const adminGuardGuard: CanActivateFn = (route, state) => {
  if(typeof localStorage !='undefined'){
    const token=localStorage.getItem("token")
    const router =inject(Router)

const commonServ=inject(CommonService)


const storedEncryptedData = localStorage.getItem('role');
if (storedEncryptedData) {
  var decryptedData = commonServ.decryptData(storedEncryptedData) 
}


    if (token && decryptedData.role=="admin"){
      
      router.navigate(["dashboard"])
return false
    }
    else{
      
      return true
    }
  }
return false
  

};
