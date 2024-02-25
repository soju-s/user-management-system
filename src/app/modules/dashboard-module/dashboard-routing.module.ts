import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuardGuard } from '../../services/authService/auth-guard.guard';


const routes: Routes = [
  {
    path:"",component:HomeComponent,canActivate:[authGuardGuard]
  }

];

@NgModule({
  declarations: [],
  imports: [[RouterModule.forChild(routes)], CommonModule],
})
export class DashboardRoutingModule {}
