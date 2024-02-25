import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../services/apiService/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private serv: ApiService,
    private router: Router
  ) {}

  // server busy error
  serverBusyError: boolean = false;

  // error message
  errorMessage: boolean = false;

  // fill field message
  fillFieldMessage: boolean = false;

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

  // submit button clicked function

  submitBtnCLicked() {
    let loginApi = '/auth/login';
    if (this.inputData.valid) {
      this.loginBtnCLicked = true;
      this.serv.post(this.inputData.value, loginApi).subscribe(
        (result: any) => {
          if (result.data.user.accessToken != '' && result.data.user.role != ''
          ) {
            localStorage.setItem('token', result.data.user.accessToken);
            localStorage.setItem('role', result.data.user.role);
            if (result.data.user.role == 'admin') {
              this.router.navigate(['admin/dashboard']);
              this.loginBtnCLicked = false;
            }
          } else {
            this.errorMessage = true;
            this.loginBtnCLicked = false;
          }
        },
        (err: any) => {
          if (err.status == 0) {
            this.serverBusyError = true;
            this.loginBtnCLicked = false;
            setTimeout(() => {
              this.serverBusyError = false;
            }, 3000);
          } else if (err.error.data.error.status == 401) {
            this.invalidUsernameorPassword = true;
            this.loginBtnCLicked = false;
            setTimeout(() => {
              this.invalidUsernameorPassword = false;
            }, 2000);
          } else if (err.error.data.error.status == 404) {
            this.userNotFoundError = true;
            this.loginBtnCLicked = false;
            setTimeout(() => {
              this.userNotFoundError = false;
            }, 2000);
          }
        }
      );
    } else {
      this.fillFieldMessage = true;
      setTimeout(() => {
        this.fillFieldMessage = false;
      }, 2000);
    }
  }

  // password show button clicked

  passwordShowBtnClicked(passwordVar: any) {
    if (passwordVar.type == 'password') {
      passwordVar.type = 'text';
    } else {
      passwordVar.type = 'password';
    }
  }
}
