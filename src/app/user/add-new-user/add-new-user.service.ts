import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewUserComponent } from './add-new-user.component';

@Injectable({
  providedIn: 'root'
})
export class AddNewUserService {

  constructor(private matDialog: MatDialog) { }

  openAddUser() {
    return this.matDialog.open(AddNewUserComponent, { disableClose : true,
      width: '800px'
    })
  }

  openUpdateUserPopup(userId : string){
    return this.matDialog.open(AddNewUserComponent,{disableClose : true, width : '800px', data : userId})
  }
}
