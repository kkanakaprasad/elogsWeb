import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { RouteConstants } from './shared/constants/routes.constants';
import { LoginGuard } from './shared/guards/login.guard';

const routes: Routes = [
  {
    path : '',
    pathMatch : 'full',
    redirectTo : RouteConstants.HOME
  },{
    path : RouteConstants.HOME,
    component : HomeComponent,
    children : [

    ]
  },
  {
    path : '',
    component : MainComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path : RouteConstants.DASHBOARD,
        loadChildren : () => import('./dashboard/dashboard.module').then((m)=>m.DashboardModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
