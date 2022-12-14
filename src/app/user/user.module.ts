import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddNewUserComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormControl
  ]
})
export class UserModule { }
