import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateOrganizationComponent } from './create-organization/create-organization.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { OrganizationRoutingModule } from './organization-routing.module';



@NgModule({
  declarations: [CreateOrganizationComponent, OrganizationListComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    OrganizationRoutingModule
  ]
})
export class OrganizationModule { }
