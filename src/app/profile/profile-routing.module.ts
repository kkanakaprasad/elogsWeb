import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { EmailReportsComponent } from './email-reports/email-reports.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {
    path: '',
    component:ProfileComponent,
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
