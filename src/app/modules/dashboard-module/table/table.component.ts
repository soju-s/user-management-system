import { AfterViewInit, Component, OnInit, ViewChild  } from '@angular/core';
import { MatPaginator,MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiService } from '../../../services/apiService/api.service';
import { HttpHeaders } from '@angular/common/http';
import { CommonService } from '../../../services/commonService/common.service';
import { CreateAccountComponent } from '../create-account/create-account.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements AfterViewInit,OnInit{
  
  // variable to store user array
  userArray:any=[]

  // matt table
   ELEMENT_DATA: PeriodicElement[] = this.userArray

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'role','edit','delete'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator 

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }



  // api link to delete
  apiDeleteLink="/admin/users/"

  // api link to register

  apiLInk="/admin/users"

  constructor(private api:ApiService,private commonService:CommonService,public dialog: MatDialog){}

  ngOnInit(): void {
    
this.allUserLIst()




// behaviour data

this.commonService.behaviourTableData.subscribe((res:any)=>{
  if(res){
   this.allUserLIst()
  }
})

  }

  // function to delete user

  
  deleteUser(id:any){
    let token=localStorage.getItem("token");
if(token){
  let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  this.api.delete(id,this.apiDeleteLink,headers).subscribe((res:any)=>{
   
    if(res.status=="true"){
      this.allUserLIst()
    }
  })
}
  }

  // function to open createAccount component and edit user
 

  openDialog(element?:any) {
   
    
    const dialogRef = this.dialog.open(CreateAccountComponent,{data:{element,statuss:"true"}} );

    dialogRef.afterClosed().subscribe(result => {
     
    });
  }


  // function to list all users

allUserLIst(){
  let token=localStorage.getItem("token");
  if(token){

    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.api.get(this.apiLInk,headers).subscribe((result:any)=>{
this.userArray=result.data.users


    
  })
}
}





 
}

// matt table

export interface PeriodicElement {
  firstName: string;
  lastName: string;
  email: string;
  role:string;
  edit:string
 delete:string
}

