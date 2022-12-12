import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './Modules/material/material.module';
import { ConfirmationDialogModule } from './confirmation-dialog/confirmation-dialog.module';
import { CustomModelModule } from './custom-model/custom-model.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ConfirmationDialogModule,
    CustomModelModule
  ],
  exports: [
    MaterialModule,
    ConfirmationDialogModule,
    CustomModelModule
  ]
})
export class SharedModule { }
