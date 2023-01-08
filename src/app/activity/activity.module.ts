import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CreateactivityComponent } from './createactivity/createactivity.component';
import { ActivityComponent } from './activity.component';




@NgModule({
  declarations: [
    CreateactivityComponent,
    ActivityComponent,
  ],
  imports: [
    CommonModule,
    ActivityRoutingModule,
    ReactiveFormsModule,
    SharedModule

  ]
})
export class ActivityModule { }
