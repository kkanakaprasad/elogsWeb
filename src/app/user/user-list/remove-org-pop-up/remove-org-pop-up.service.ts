import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RemoveOrgPopUpComponent } from './remove-org-pop-up.component';

@Injectable({
  providedIn: 'root'
})
export class RemoveOrgPopUpService {

constructor(private matDialog: MatDialog) { }

removeOrgPopUp(selectedUserID:string) {
  return this.matDialog.open(RemoveOrgPopUpComponent, { disableClose : true,
    minWidth: '800px',data:selectedUserID, 
  })
}

}
