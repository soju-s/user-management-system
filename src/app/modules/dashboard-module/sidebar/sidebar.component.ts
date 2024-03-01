import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { CreateAccountComponent } from '../create-account/create-account.component';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})




export class SidebarComponent {
  constructor(public dialog: MatDialog) {}



  openDialog() {

    const element={}
    const dialogRef = this.dialog.open(CreateAccountComponent,{data:{element,statuss:"false"}});

    dialogRef.afterClosed().subscribe(result => {
     
    });
  }

}
