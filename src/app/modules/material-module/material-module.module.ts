import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatButtonModule, MatDividerModule, MatIconModule, 
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatSidenavModule,
    MatTableModule, MatPaginatorModule
    
  ],
  exports:[MatButtonModule,
    MatButtonModule, MatDividerModule, MatIconModule, 
    MatFormFieldModule, MatInputModule, MatSelectModule,
  MatSidenavModule,
  MatTableModule, MatPaginatorModule]
})
export class MaterialModuleModule { }
