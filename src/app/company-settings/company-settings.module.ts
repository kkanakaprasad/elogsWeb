import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanySettingsRoutingModule } from './company-settings-routing.module';
import { CompanySettingsComponent } from './company-settings.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CompanySettingsComponent
  ],
  imports: [
    CommonModule,
    CompanySettingsRoutingModule,   
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class CompanySettingsModule { }
