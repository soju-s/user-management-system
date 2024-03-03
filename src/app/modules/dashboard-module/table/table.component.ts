import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiService } from '../../../services/apiService/api.service';
import { HttpHeaders } from '@angular/common/http';
import { CommonService } from '../../../services/commonService/common.service';
import { CreateAccountComponent } from '../create-account/create-account.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../../../components/confirmation/confirmation.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements AfterViewInit, OnInit {

  // Admin role
  adminRole:boolean=false

  // variable to store user array
  userArray:any = [];

  // matt table
  ELEMENT_DATA: PeriodicElement[] = [this.userArray]

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'role',
    'edit',
    'delete',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
this.allUserLIst()

//     let token = localStorage.getItem('token');
//     if (token) {
//       let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//  // api link to register

// let apiLInk = '/admin/users';
//       this.api.get(apiLInk, headers).subscribe((result:any) => {
//        this.dataSource.data = result.data.users;
//         this.dataSource.paginator = this.paginator;
//       });
//     }
    

   
  }

  constructor(
    private api: ApiService,private commonService: CommonService,public dialog: MatDialog, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {

    // load table data when page opens

    this.allUserLIst();

    // behaviour data to update table after adding

    this.commonService.behaviourTableData.subscribe((res:any) => {
      if (res) {
       this.allUserLIst()
       this.cdr.detectChanges()
      
      }
    });

    // behaviour data to update table after deleting

    this.commonService.behaviourDelete.subscribe((res: any) => {
      if (res == true) {
        this.allUserLIst();

        this.commonService.behaviourDelete.next(false);
      }
    });


    // to check role of user

    const storedEncryptedData = localStorage.getItem('role');

    if(storedEncryptedData){
    
      const decryptedData = this.commonService.decryptData(storedEncryptedData) 
      if ( decryptedData.role=="admin"){
  this.adminRole=true
      }
   }

  }

    // function to list all users

    allUserLIst() {
      let token = localStorage.getItem('token');
      if (token) {
        let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
   // api link to register
  
  let apiLInk = '/admin/users';
        this.api.get(apiLInk, headers).subscribe((result: any) => {
          this.dataSource.data = result.data.users;
          this.dataSource.paginator = this.paginator;
        });
      }
    }

  // function to delete user

  deleteUser(id: any) {
    this.dialog.open(ConfirmationComponent, {
      data: { id, statuss: 'delete' },
    });
  }

  // function to open createAccount component and edit user

  openDialog(element?: any) {
    const dialogRef = this.dialog.open(CreateAccountComponent, {
      data: { element, statuss: 'true' },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }


}

// matt table

export interface PeriodicElement {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  edit: string;
  delete: string;
}


