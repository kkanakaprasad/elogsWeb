import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateOrganizationComponent } from './create-organization/create-organization.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [CreateOrganizationComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OrganizationModule { }
