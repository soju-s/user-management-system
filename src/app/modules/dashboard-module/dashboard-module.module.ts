import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { MaterialModuleModule } from '../material-module/material-module.module';
import { HeaderComponent } from '../../components/header/header.component';







@NgModule({
  declarations: [
    TableComponent,
    SidebarComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModuleModule,

  ]
})
export class DashboardModuleModule { }
