import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanySettingsRoutingModule } from './company-settings-routing.module';
import { CompanySettingsComponent } from './company-settings.component';


@NgModule({
  declarations: [
    CompanySettingsComponent
  ],
  imports: [
    CommonModule,
    CompanySettingsRoutingModule
  ]
})
export class CompanySettingsModule { }
