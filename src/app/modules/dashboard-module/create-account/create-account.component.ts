import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../services/apiService/api.service';
import { HttpHeaders } from '@angular/common/http';
import { CommonService } from '../../../services/commonService/common.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css',
})
export class CreateAccountComponent implements OnInit {
  // button status
  buttonStatusChange: any = 'create';

  // to hide and show password and confirm password field
  hide = true;
  confirmHide = true;

  // error occured
  errorOccured: boolean = false;

  // registration successfull
  registrationSuccessful: boolean = false;

  // button disable
  buttonDIsable: boolean = false;

  // account already exist
  accountAlreadyExist: boolean = false;

  // spinner
  spinnerVisible: boolean = false;

  // edit successfull
  updatedSuccessful:boolean=false

  // @Output() refresh=new EventEmitter()

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: { element?: any; statuss: any },
    public dialogRef: MatDialogRef<any>
  ) {}

  ngOnInit(): void {
    // button change condition

    if (this.data.statuss == 'true') {
      this.buttonStatusChange = 'Edit';
    } else {
      this.buttonStatusChange = 'Create';
    }
  }

  // reactive form group

  registerData = this.fb.group(
    {
      firstName: [this.data.element?.firstName, [Validators.required]],
      lastName: [this.data.element?.lastName, [Validators.required]],
      password: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9]{8,30}$')],
      ],
      confirmPassword: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9]{8,30}$')],
      ],
      email: [
        this.data.element?.email,
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/),
        ],
      ],
      role: [this.data.element?.role, [Validators.required]],
    },
    {
      validators: this.passwordMatchValidator,
    }
  );

  // toogle  show and hide password fields
  toggleVisibility(): void {
    this.hide = !this.hide;
  }

  // toogle show and hide confirm password field
  toggleVisibilityConfirm() {
    this.confirmHide = !this.confirmHide;
  }

  // account registration or editing function

  buttonClicked() {
    if (this.registerData.valid) {
      this.spinnerVisible=true
      this.buttonDIsable = true;
      delete this.registerData.value.confirmPassword;
      const token = localStorage.getItem('token');
      if (token) {
        var headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        // for registration
        if (this.data.statuss == 'false') {
          let registerUrl = '/admin/users';
          this.api
            .post(this.registerData.value, registerUrl, headers)
            .subscribe(
              (res: any) => {
                this.spinnerVisible=false
                if (res.status == 'true') {
                  this.registrationSuccessful = true;
                  this.commonService.behaviourTableData.next(res.data.user);

                  setTimeout(() => {
                    this.dialogRef.close();
                  }, 2000);
                } else {
                  this.errorOccured = true;
                  this.buttonDIsable = false;

                  setTimeout(() => {
                    this.errorOccured = false;
                  }, 3000);
                }
              },
              (error: any) => {
                this.spinnerVisible=false
                if (error.status == 409) {
                  this.buttonDIsable = false;
                  this.accountAlreadyExist = true;

                  setTimeout(() => {
                    this.accountAlreadyExist = false;
                  }, 3000);
                } else {
                  this.buttonDIsable = true;
                  this.errorOccured = true;

                  setTimeout(() => {
                    this.errorOccured = false;
                  }, 3000);
                }
              }
            );
        }

        // for editing
        else if (this.data.statuss == 'true') {
          let editUrlandId = '/admin/users/' + this.data.element.id;
          this.api
            .put(editUrlandId, this.registerData.value, headers)
            .subscribe(
              (res: any) => {
                if (res.status == 'true') {
                  this.updatedSuccessful=true
                  this.commonService.behaviourTableData.next(res.data.user);

                  setTimeout(() => {
                    this.dialogRef.close();
                  }, 2000);
                } else {
                  this.errorOccured = true;
                  this.buttonDIsable=false
                }
              },
              (err: any) => {
                this.spinnerVisible=false
                if (err.status == 409) {
                  this.buttonDIsable = false;
                  this.accountAlreadyExist = true;

                  setTimeout(() => {
                    this.accountAlreadyExist = false;
                  }, 3000);
                } else {
                  this.buttonDIsable = true;
                  this.errorOccured = true;

                  setTimeout(() => {
                    this.errorOccured = false;
                  }, 3000);
                }
              }
            );
        }
      } else {
        this.errorOccured = true;

        setTimeout(() => {
          this.errorOccured = false;
        }, 3000);
      }
    }
  }

  // password and confirm password check function

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
