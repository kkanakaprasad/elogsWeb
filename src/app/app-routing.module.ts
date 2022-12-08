import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { RouteConstants } from './shared/constants/routes.constants';

const routes: Routes = [
  {
    path : '',
    pathMatch : 'full',
    redirectTo : 'home'
  },{
    path : '',
    component : HomeComponent,
    children : [

    ]
  },
  {
    path : '',
    component : MainComponent,
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
