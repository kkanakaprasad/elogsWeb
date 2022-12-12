import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { MaterialModule } from '../Modules/material/material.module';



@NgModule({
  declarations: [
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class ConfirmationDialogModule { }
