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
      },
      {
        path : RouteConstants.USER_LIST,
        data : {
          roles : [Roles.SuperAdmin]
        },
        loadChildren: () => import('./user/user.module').then((m)=> m.UserModule)
      },
      {
        path:RouteConstants.PROFILE,
        data:{
          roles:[Roles.SuperAdmin,Roles.User]
        },
        loadChildren:() => import('./profile/profile.module').then(m=>m.ProfileModule)
      },
      {
        path:RouteConstants.ACTIVITY,
        data:{
          roles:[Roles.SuperAdmin,Roles.User]
        },
        loadChildren:() => import('./activity/activity.module').then(m=>m.ActivityModule)
      },
      {
        path : RouteConstants.COMPANY_SETTINGS,
        data:{
          roles:[Roles.SuperAdmin]
        },
        loadChildren:()=> import('./company-settings/company-settings.module').then(m=>m.CompanySettingsModule),

      },{
      path : RouteConstants.ACTIVITY_DETAILS,
        data:{
          roles:[Roles.SuperAdmin,Roles.User]
        },
        loadChildren:()=> import('./activity/activity.module').then(m=>m.ActivityModule),
      },

      {
        path : RouteConstants.ARCHIVE,
        data:{
          roles:[Roles.SuperAdmin]
        },
        loadChildren:()=> import('./archive/archive.module').then(m=>m.ArchiveModule),

      },

      {
        path : RouteConstants.DOCUMENTS,
        data:{
          roles:[Roles.SuperAdmin,Roles.User]
        },
        loadChildren:()=> import('./documents/documents.module').then(m=>m.DocumentsModule),

      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
