import { HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../../services/apiService/api.service';
import { CommonService } from '../../services/commonService/common.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent implements OnInit {

  // error message
  errorMessage: boolean = false

  // to show delete or logout div
  divShow: any

   // api link to delete
   apiDeleteLink = "/admin/users/"

  constructor(private router: Router, @Inject(MAT_DIALOG_DATA) public data: { id?: any, statuss: any }, public dialogRef: MatDialogRef<any>, private api: ApiService, private common: CommonService) { }

  ngOnInit(): void {
    if (this.data.statuss == "logout") {
      this.divShow = "logout"
    }
    else if (this.data.statuss == "delete") {
      this.divShow = "delete"
    }
  }


  yesClicked() {

// to logout

    if (this.divShow === 'logout') {

      localStorage.removeItem("token");
      localStorage.removeItem('role');
      localStorage.removeItem('refreshToken');
      this.dialogRef.close();
      this.router.navigate([''])
    }

    // to delete

    else if (this.divShow == "delete") {
       let token = localStorage.getItem("token");
      if (token) {
        let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        this.api.delete(this.data.id, this.apiDeleteLink, headers).subscribe((res: any) => {
          if (res.status == "true") {
            this.common.behaviourDelete.next(true)
            this.dialogRef.close();
          }
          
           },
           (err:any)=>{
            this.errorMessage=true
           })
      }
      else{
        this.errorMessage=true
      }

    }
  }

  noClicked() {
    this.dialogRef.close();
  }

}
