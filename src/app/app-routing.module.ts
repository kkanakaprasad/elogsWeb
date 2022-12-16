import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { RouteConstants } from './shared/constants/routes.constants';
import { Roles } from './shared/enums/roles.enums';
import { LoginGuard } from './shared/guards/login.guard';
import { RoleAuthenticationGuard } from './shared/guards/role-guard/role-authentication.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: RouteConstants.HOME
  }, {
    path: RouteConstants.HOME,
    component: HomeComponent,
    children: [

    ]
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [LoginGuard],
    canActivateChild:[RoleAuthenticationGuard],
    children: [
      {
        path: RouteConstants.DASHBOARD,
        data: {
          roles: [Roles.User, Roles.SuperAdmin]
        },
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path : RouteConstants.ORAGANIZATION_LIST,
        data : {
          roles : [Roles.SuperAdmin,Roles.User]
        },
        loadChildren: () => import('./organization/organization.module').then((m)=> m.OrganizationModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
