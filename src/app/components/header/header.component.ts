import { Component, EventEmitter, Output } from '@angular/core';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


 @Output() toogle=new EventEmitter()

 constructor(public dialog: MatDialog){}

  // Function to open or close sidebar

  barsClicked(){
    this.toogle.emit()
  }

  // function to logout

  openDialog() {
     this.dialog.open(ConfirmationComponent,{data:{statuss:"logout"}} );
  }
}
