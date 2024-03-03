import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../services/apiService/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

  // user already exist
  userAlreadyExist:boolean=false

  // networkError
  networkError: boolean = false;

  // to hide and show password and confirm password
  hide = true;
  confirmHide = true;

  // registration api link
  registerUrl = '/agents';

  // registraion succsess message
  registerSuccessMessage: boolean = false;

  // button disable
  buttonDisable: boolean = false;

  // registraion failed message
  registrationFailedMessage: boolean = false;

  // spinner
  spinnerVisible:boolean=false

  // hide password function
  toggleVisibility(): void {
    this.hide = !this.hide;
  }

  toggleVisibilityConfirm() {
    this.confirmHide = !this.confirmHide;
  }
  //  form builder

  registerData = this.fb.group(
    { firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['',[Validators.required, Validators.pattern('^[a-zA-Z0-9]{8,30}$')]],
      confirmPassword: ['',[Validators.required, Validators.pattern('^[a-zA-Z0-9]{8,30}$')]],
      email: ['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)]]
    },
    {
      validators: this.passwordMatchValidator
    });

  // register button clicked function

  registerClicked() {
    if (this.registerData.valid) {
      this.spinnerVisible=true
      this.buttonDisable = true;
      delete this.registerData.value.confirmPassword;
      this.api.post(this.registerData.value, this.registerUrl).subscribe((result: any) => {
        this.spinnerVisible=false
          if (result.status == 'true') {
            this.registerSuccessMessage = true;
           

            setTimeout(() => {
              this.router.navigate(['']);
            }, 2000);
          } else {
            this.registrationFailedMessage = true;
            this.buttonDisable=false
            this.spinnerVisible=false

            setTimeout(() => {
              this.registrationFailedMessage = false;
            }, 3000);
          }},
          (err: any) => {
         this.buttonDisable=false
         this.spinnerVisible=false
            // account already exist

            if(err.status==409){
              this.userAlreadyExist=true
              setTimeout(() => {
                this.userAlreadyExist=false
              }, 3000);
            }

            // network error
          
         else if (err.status == 0) {
            this.networkError = true;

            setTimeout(() => {
              this.networkError = false;
            }, 3000);
          }
          
          // registration failed
          
          else {
            this.registrationFailedMessage = true;

            setTimeout(() => {
              this.registrationFailedMessage = false;
            }, 3000);
          }
        }
      );
    } 
  }

  // custome validator for  password and confirm password

  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      return { passwordMismatch: true };
    }

    return null;
  }
}
