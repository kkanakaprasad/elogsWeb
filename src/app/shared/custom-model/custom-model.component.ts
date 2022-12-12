import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomModelData } from './custom-model.interface';


@Component({
  selector: 'app-custom-model',
  templateUrl: './custom-model.component.html',
  styleUrls: ['./custom-model.component.scss'],
})
export class CustomModelComponent implements OnInit {

  dialogActions:any;
  constructor(public dialogref:MatDialogRef<CustomModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data:CustomModelData) {
      this.dialogActions=data.actions
    }

  ngOnInit(): void {
  }

}
