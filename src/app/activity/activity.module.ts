import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CreateactivityComponent } from './createactivity/createactivity.component';
import { ActivityComponent } from './activity.component';
import { ActivityDetailsComponent } from './activity-details/activity-details.component';




@NgModule({
  declarations: [
    CreateactivityComponent,
    ActivityComponent,
    ActivityDetailsComponent,
  ],
  imports: [
    CommonModule,
    ActivityRoutingModule,
    ReactiveFormsModule,
    SharedModule

  ]
})
export class ActivityModule { }
