import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModuleModule } from './auth-module/auth-module.module';
import { DashboardModuleModule } from './dashboard-module/dashboard-module.module';
import { MaterialModuleModule } from './material-module/material-module.module';
import { SharedModuleModule } from './shared-module/shared-module.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AuthModuleModule,
    DashboardModuleModule,
    MaterialModuleModule,
    SharedModuleModule,
  
  ]
})
export class MainModuleModule { }
