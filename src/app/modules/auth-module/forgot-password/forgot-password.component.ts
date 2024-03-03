import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

 

  constructor(private fb:FormBuilder){}



  formData=this.fb.group({
    email:["",[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)]]
  })

  sendOtpClicked(){

   if(this.formData.valid){
    
   }
   else{
   
   }

  }

}
