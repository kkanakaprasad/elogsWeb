import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanySettingsRoutingModule } from './company-settings-routing.module';
import { CompanySettingsComponent } from './company-settings.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ImportExportComponent } from './import-export/import-export/import-export.component'
import { CategoryComponent } from './category/category.component';



@NgModule({
  declarations: [
    CompanySettingsComponent,
    ImportExportComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    CompanySettingsRoutingModule,   
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class CompanySettingsModule { }
