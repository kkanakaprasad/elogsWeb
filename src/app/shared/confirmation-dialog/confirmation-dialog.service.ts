import { Injectable } from '@angular/core';
import { ConfirmationDialogdata } from './confirmation-dialog.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  constructor(public confirmationDialog:MatDialog) { }

  /**
   * 
   * @param data is properties of popup ConfirmationDialogdata.
   * @returns it will return the Boolean value after subscribeing to the .afterclosed. 
   */
  open(data:ConfirmationDialogdata){
    const ref=this.confirmationDialog.open(ConfirmationDialogComponent,{disableClose:true,width :data.dialogWidth?data.dialogWidth:'auto' ,data, minWidth : '300px'})
    return ref;
  }
}
