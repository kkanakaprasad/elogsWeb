import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateOrganizationComponent } from './create-organization/create-organization.component';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private matDialog: MatDialog) { }

 
  openCreateOrganizatioPopup() {
    this.matDialog.open(CreateOrganizationComponent, { disableClose : true,
      width: '500px'
    })
}
}
