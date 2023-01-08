import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileuploaderComponent } from './fileuploader.component';
import { MaterialModule } from '../Modules/material/material.module';



@NgModule({
  declarations: [FileuploaderComponent],
  imports: [
    CommonModule,
    MaterialModule
 
  ],
  exports:[
    FileuploaderComponent
  ]
})
export class FileuploaderModule { }
