import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';


export const adminGuardGuard: CanActivateFn = (route, state) => {
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
if (storedEncryptedData) {
  var decryptedData = decryptData(storedEncryptedData);
  console.log(decryptedData); 
}


    if (token && decryptedData.role=="admin"){
      console.log("hy");
      
      router.navigate(["dashboard"])
return false
    }
    else{
      console.log("helo");
      
      return true
    }
  }
return false
  

};
