import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanySettingsComponent } from './company-settings.component';
import { ImportExportComponent } from './import-export/import-export/import-export.component';

const routes: Routes = [
  {
    path : '',
    component : CompanySettingsComponent,
    children: [{
      path: 'import&exports',
      component: ImportExportComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanySettingsRoutingModule { }
