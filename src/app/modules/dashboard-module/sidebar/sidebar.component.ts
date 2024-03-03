import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { CreateAccountComponent } from '../create-account/create-account.component';
import { CommonService } from '../../../services/commonService/common.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent implements OnInit{
  constructor(public dialog: MatDialog,private commonServ:CommonService) {}

  adminRole:boolean=false

ngOnInit(): void {
 
  const storedEncryptedData = localStorage.getItem('role');

  if(storedEncryptedData){
  
    const decryptedData = this.commonServ.decryptData(storedEncryptedData) 
    if ( decryptedData.role=="admin"){
this.adminRole=true
    }
 }
}

  openDialog() {

    const element={}
    const dialogRef = this.dialog.open(CreateAccountComponent,{data:{element,statuss:"false"}});

    dialogRef.afterClosed().subscribe(result => {
     
    });
  }

}
