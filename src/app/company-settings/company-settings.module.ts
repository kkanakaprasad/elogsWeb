import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanySettingsRoutingModule } from './company-settings-routing.module';
import { CompanySettingsComponent } from './company-settings.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ImportExportComponent } from './import-export/import-export/import-export.component'
import { CategoryComponent } from './category/category.component';
import { NewCategoryPopUpComponent } from './category/new-category-pop-up/new-category-pop-up.component';



@NgModule({
  declarations: [
    CompanySettingsComponent,
    ImportExportComponent,
    CategoryComponent,
    NewCategoryPopUpComponent
  ],
  imports: [
    CommonModule,
    CompanySettingsRoutingModule,   
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class CompanySettingsModule { }
