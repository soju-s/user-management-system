import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent implements OnInit{

  constructor(private router:Router,@Inject(MAT_DIALOG_DATA) public data : {statuss:any},public dialogRef:MatDialogRef<any>){}

    // error message
    errorMessage:boolean=false

  //  storedEncryptedData = localStorage.getItem('encryptedData');
  //  if (storedEncryptedData:any) {
  //   const decryptedData = this.decryptData(storedEncryptedData);
  //   console.log(decryptedData); 
  // }

  // Function to decrypt data
//  decryptData(encryptedData: string): any {
//   const encryptionKey = 'yourEncryptionKey';
//   const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
//   return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
// }

divShow:any


ngOnInit(): void {
  if(this.data.statuss=="logout"){
    this.divShow="logout"
  }
}


  logOutClicked(){

    if(localStorage.getItem("token") && localStorage.getItem("role")){
      localStorage.removeItem("token");
      localStorage.removeItem('role',)
      localStorage.removeItem('refreshToken')

      

      this.router.navigate([''])
    
    }
else{
this.errorMessage=true
}
   
  }


  noClicked(){
    this.dialogRef.close();
  }

}
