import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { ConfirmationComponent } from '../../components/confirmation/confirmation.component';
import { userGuardGuard } from '../../services/authService/user-guard.guard';
import { adminGuardGuard } from '../../services/authService/admin-guard.guard';


const routes: Routes = [
  {
    path: "", component: HomeComponent, canActivate: [userGuardGuard]
  },
  {
    path: "user", component: UserComponent,canActivate:[adminGuardGuard]
  },
  {
    path: "logout", component: ConfirmationComponent
  }

];

@NgModule({
  declarations: [],
  imports: [[RouterModule.forChild(routes)], CommonModule],
})
export class DashboardRoutingModule { }
