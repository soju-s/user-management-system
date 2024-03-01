import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { authGuardGuard } from './services/authService/auth-guard.guard';
import { adminGuardGuard } from './services/authService/admin-guard.guard';

const routes: Routes = [
 
  {
    path:"",
    loadChildren:()=> import('./modules/auth-module/auth-routing.module').then(m=> m.AuthRoutingModule),canActivate:[adminGuardGuard]
  },
  {
    path:"dashboard",
    loadChildren:()=>import(`./modules/dashboard-module/dashboard-routing.module`).then(m => m.DashboardRoutingModule),canActivate:[authGuardGuard]
  },
{
  path:"**",component:PageNotFoundComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
