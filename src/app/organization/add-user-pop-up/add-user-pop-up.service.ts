import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserPopUpComponent } from './add-user-pop-up.component';

@Injectable({
  providedIn: 'root'
})
export class AddUserPopUpService {

  constructor(private matDialog: MatDialog) { }
  openAddUser(organizationId:string) {
    return this.matDialog.open(AddUserPopUpComponent, { disableClose : true,
      minWidth: '80vw',data:organizationId
    })
  }
}
