import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RemoveUserPopUpComponent } from './remove-user-pop-up.component';

@Injectable({
  providedIn: 'root'
})
export class RemoveUserPopUpService {

  constructor(private matDialog: MatDialog) { }
  removeUserPopUp(selectedOrganizationId:string) {
    return this.matDialog.open(RemoveUserPopUpComponent, { disableClose : true,
      minWidth: '80vw',data:selectedOrganizationId, 
    })
  }
}
