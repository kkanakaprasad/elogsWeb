import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AssignOrganizationPopUpComponent } from './assign-organization-pop-up.component';

@Injectable({
  providedIn: 'root'
})
export class AssignOrganizationPopUpService {

  constructor(private matDialog: MatDialog) { }

  assignOrgPopUp(user: any) {
    return this.matDialog.open(AssignOrganizationPopUpComponent, {
      // disableClose: false, 
      data: user,
      minWidth: '800px',
      // height: '70%',
      // autoFocus: false,
    })
  }

}
