import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ActivityComponent } from './activity.component';
import { CreateactivityComponent } from './createactivity/createactivity.component';

const routes: Routes = [
  {
    path : '',
    component : ActivityComponent
  },
  
  { path: 'create', component: CreateactivityComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule { }
