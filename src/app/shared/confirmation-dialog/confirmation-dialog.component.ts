import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationDialogdata } from './confirmation-dialog.interface';


@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

  actionLabel:string= 'Confirm';
  constructor(public dialogref:MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:ConfirmationDialogdata) {
      if(data.actionLabel){
        this.actionLabel = data?.actionLabel
      }
    }
 
}
