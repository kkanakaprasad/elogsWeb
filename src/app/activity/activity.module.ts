import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CreateactivityComponent } from './createactivity/createactivity.component';
import { ActivityComponent } from './activity.component';
import { ActivityDetailsComponent } from './activity-details/activity-details.component';
import { MoveToOrganizationPopUpComponent } from './move-to-organization-pop-up/move-to-organization-pop-up.component';




@NgModule({
  declarations: [
    CreateactivityComponent,
    ActivityComponent,
    ActivityDetailsComponent,
    MoveToOrganizationPopUpComponent,
  ],
  imports: [
    CommonModule,
    ActivityRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ]
})
export class ActivityModule { }
