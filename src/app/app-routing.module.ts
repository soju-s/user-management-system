import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuardGuard } from './services/authService/auth-guard.guard';

const routes: Routes = [
 
  {
    path:"",
    loadChildren:()=> import('./modules/auth-module/auth-routing.module').then(m=> m.AuthRoutingModule)
  },
  {
    path:"admin/dashboard",
    loadChildren:()=>import(`./modules/dashboard-module/dashboard-routing.module`).then(m => m.DashboardRoutingModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
