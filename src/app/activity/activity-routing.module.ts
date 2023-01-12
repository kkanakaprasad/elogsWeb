import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ActivityDetailsComponent } from './activity-details/activity-details.component';
import { ActivityComponent } from './activity.component';
import { CreateactivityComponent } from './createactivity/createactivity.component';
import { MoveToOrganizationPopUpComponent } from './move-to-organization-pop-up/move-to-organization-pop-up.component';

const routes: Routes = [
  {
    path : '',
    component : ActivityComponent
  },
  
  { path: 'create', component: CreateactivityComponent },
  {
    path: "details", component:ActivityDetailsComponent
  },
  {path:'move',component:MoveToOrganizationPopUpComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule { }
