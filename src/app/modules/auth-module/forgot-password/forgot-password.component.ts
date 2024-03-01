import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit{

  // invalid email eror message
  invalidEMailMSg:boolean=false


  constructor(private fb:FormBuilder,private router:Router){}

  ngOnInit(): void {
    if(localStorage.getItem('token') && localStorage.getItem('role')=="admin"){

      this.router.navigate(["/dashboard"]);

    }
  }

  formData=this.fb.group({
    email:["",[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)]]
  })

  sendOtpClicked(){

   if(this.formData.valid){
    
   }
   else{
    this.invalidEMailMSg=true;

    setTimeout(() => {
      this.invalidEMailMSg=false
    }, 2000);
   }

  }

}
