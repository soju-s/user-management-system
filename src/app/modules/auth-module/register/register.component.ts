import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private fb:FormBuilder){}

  registerData=this.fb.group({
    firstName:["",[Validators.required]],
    lastName:["",[Validators.required]],
    password:["",[Validators.required]],
    confirmPassword:["",[Validators.required]],
    email:["",[Validators.required]],
    role:["",[Validators.required]],

  })

  // register button clicked function

  registerClicked(){
   if(this.registerData.valid){
   
   }
  }

}
