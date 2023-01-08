import { Injectable } from '@angular/core';
import { CustomModelData } from './custom-model.interface';
import { MatDialog } from '@angular/material/dialog';
import { CustomModelComponent } from './custom-model.component';


@Injectable({
  providedIn: 'root'
})
export class CustomModelService {

  constructor(public matDialog: MatDialog) { }
  open(data: CustomModelData) {
    const ref = this.matDialog.open(CustomModelComponent, { disableClose: true, width: data.width ? data.width : 'auto', height: data.height ? data.height : 'auto', data })
    return ref;
  }
}
