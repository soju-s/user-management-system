import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../services/apiService/api.service';
import { Router } from '@angular/router';
import { CommonService } from '../../../services/commonService/common.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private serv: ApiService,
    private router: Router,
    private commonServ:CommonService
  ) {}


  // to disable button
  buttonDIsable:boolean=false

   // to hide and show password 
   hide = true;
  
  // server busy error
  serverBusyError: boolean = false;

  // error message
  errorMessage: boolean = false;


  // login button clicked
  loginBtnCLicked: boolean = false;

  // error invalid username or password message
  invalidUsernameorPassword: boolean = false;

  // user not found error
  userNotFoundError: boolean = false;

  // reactive form group

  inputData = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/),
      ],
    ],
    password: [
      '',
      [Validators.required, Validators.pattern('^[a-zA-Z0-9]{8,30}$')],
    ],
  });

     // hide password function

    toggleVisibility(): void {
      this.hide = !this.hide;
    }

  // submit button clicked function

  submitBtnCLicked() {
    let loginApi = '/auth/login';
    if (this.inputData.valid) {
      this.buttonDIsable=true
      this.loginBtnCLicked = true;
      this.serv.post(this.inputData.value, loginApi).subscribe(
        (result: any) => {
          if (
            result.data.user.accessToken != '' &&
            result.data.user.role != ''
          ) {

            // encrypting role

            const sensitiveData={role:result.data.user.role};
             const encryptedData = this.commonServ.encryptData(sensitiveData);
            localStorage.setItem('role', encryptedData);
            localStorage.setItem('token', result.data.user.accessToken);
            localStorage.setItem('refreshToken', result.data.user.refreshToken);
            
            if (result.data.user.role == 'admin'|| result.data.user.role=="supervisor") {
              this.router.navigate(['dashboard']);
              this.loginBtnCLicked = false;
            }
            else if(result.data.user.role=='agent'){
              this.router.navigate(['dashboard/user'])
              this.loginBtnCLicked=false
            }
          } else {
            this.buttonDIsable=false
            this.errorMessage = true;
            this.loginBtnCLicked = false;
          }
        },
        (err: any) => {
           this.buttonDIsable=false
            // network wrror
          if (err.status == 0) {
            this.serverBusyError = true;
            this.loginBtnCLicked = false;
            setTimeout(() => {
              this.serverBusyError = false;
            }, 3000);
          }

          // wrong password
          
          else if (err.error.data.error.status == 401) {
            this.invalidUsernameorPassword = true;
            this.loginBtnCLicked = false;
            setTimeout(() => {
              this.invalidUsernameorPassword = false;
            }, 3000);
          }
          
          // user not found

          else if (err.error.data.error.status == 404) {
            this.userNotFoundError = true;
            this.loginBtnCLicked = false;
            setTimeout(() => {
              this.userNotFoundError = false;
            }, 3000);
          }
          else{
            this.errorMessage=true

            setTimeout(() => {
              this.errorMessage=false
            }, 3000);
          }
        }
      );
    } 
  }


}
