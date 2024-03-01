import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../services/apiService/api.service';
import { HttpHeaders } from '@angular/common/http';
import { CommonService } from '../../../services/commonService/common.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css',
})


export class CreateAccountComponent implements OnInit{

  buttonStatusChange:any="create"

  
ngOnInit(): void {
  if(this.data.statuss=="true"){
    this.buttonStatusChange="Edit"
  }
  else {
    this.buttonStatusChange="Create"
  }
}

  @Output() refresh=new EventEmitter()

  hide = true;
  confirmHide=true

  registerUrl = '/admin/users';

  constructor(private fb: FormBuilder, private api: ApiService,private commonService:CommonService,@Inject(MAT_DIALOG_DATA) public data : {element?: any,statuss:any}) {}


  

  registerSuccessMessage: boolean = false;

  registerData = this.fb.group({
    firstName: [this.data.element?.firstName, [Validators.required]],
    lastName: [this.data.element?.lastName, [Validators.required]],
    password: ["",[Validators.required, Validators.pattern('^[a-zA-Z0-9]{8,30}$')]],
    confirmPassword: ['',[Validators.required, Validators.pattern('^[a-zA-Z0-9]{8,30}$')]],
    email:[this.data.element?.email,[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)],],
    role: [this.data.element?.role, [Validators.required]],
  },{
    validators:this.passwordMatchValidator
  });


  toggleVisibility(): void {
    this.hide = !this.hide;
  }

  toggleVisibilityConfirm(){
    this.confirmHide=!this.confirmHide
  }

  // account registration or editing function

  registerClicked() {
    if (this.registerData.valid) {
      delete this.registerData.value.confirmPassword;

      const token = localStorage.getItem('token');

      if (token) {
        var headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        // for registration

        if(this.data.statuss=="false"){
          this.buttonStatusChange="create"
          this.api.post(this.registerData.value, this.registerUrl, headers)
          .subscribe((res: any) => {
          if (res.status == "true") {
              this.registerSuccessMessage = true;
              alert('registration sucessfull');
             
           this.commonService.behaviourTableData.next(res.data.user)  
            }
          });
        }

        // for editing

        else if(this.data.statuss=="true"){
this.buttonStatusChange="edit"
          var editUrl="/admin/users/"+this.data.element.id
          this.api.put(editUrl,this.registerData.value,headers)
          .subscribe((res: any) => {
          if (res.status == "true") {
              this.registerSuccessMessage = true;
              alert('edit sucessfull');
             
           this.commonService.behaviourTableData.next(res.data.user)  
            }
          });

        }
      }
    }
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
  
    if (password?.value !== confirmPassword?.value) {
      return { 'passwordMismatch': true };
    }
  
    return null;
  }
  
}
