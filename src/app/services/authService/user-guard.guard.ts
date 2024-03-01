import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

export const userGuardGuard: CanActivateFn = (route, state) => {


  if(typeof localStorage !='undefined'){
    const token=localStorage.getItem("token")
    const router =inject(Router)

           // Function to decrypt data
function decryptData(encryptedData: string): any {
  const encryptionKey = 'yourEncryptionKey';
  const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

const storedEncryptedData = localStorage.getItem('role');

if(storedEncryptedData){

  const decryptedData = decryptData(storedEncryptedData);
  if (token && decryptedData.role=="agent"){
    router.navigate(["/dashboard/user"])
return false
  }
  else{
   
    return true
  }
}

  
  }
return false
  

};
