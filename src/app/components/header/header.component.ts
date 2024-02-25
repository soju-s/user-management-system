import { Component, EventEmitter, Output } from '@angular/core';
import { CommonService } from '../../services/commonService/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


 @Output() toogle=new EventEmitter()



  // error message
  errorMessage:boolean=false

  constructor(private dataToSidebarservice : CommonService,private router:Router){}

  // Function to open or close sidebar

  barsClicked(){

    this.toogle.emit()
    
  }

  // function to logout

  logoutBtnClicked(){

    if(localStorage.getItem("token") && localStorage.getItem("role")){
      localStorage.removeItem("token");
      localStorage.removeItem('role',)
      this.router.navigate([''])
    }
else{
this.errorMessage=true
}
    

  }
}
