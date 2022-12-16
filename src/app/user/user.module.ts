import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AddNewUserComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
