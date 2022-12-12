import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './Modules/material/material.module';
import { ConfirmationDialogModule } from './confirmation-dialog/confirmation-dialog.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ConfirmationDialogModule
  ],
  exports: [
    MaterialModule,
    ConfirmationDialogModule
  ]
})
export class SharedModule { }
