import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomModelComponent } from './custom-model.component';
import { MaterialModule } from '../Modules/material/material.module';



@NgModule({
  declarations: [
    CustomModelComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class CustomModelModule { }
