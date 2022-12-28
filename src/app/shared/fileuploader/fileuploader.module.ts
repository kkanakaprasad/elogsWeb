import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileuploaderComponent } from './fileuploader.component';



@NgModule({
  declarations: [FileuploaderComponent],
  imports: [
    CommonModule
  ],
  exports:[
    FileuploaderComponent
  ]
})
export class FileuploaderModule { }
