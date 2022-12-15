import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrganizationService } from '../organization/organization.service';
import { AddNewUserService } from '../user/add-new-user/add-new-user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private matDialog: MatDialog, private organizationService: OrganizationService, private addNewUserService :AddNewUserService) { }

  ngOnInit(): void {
  }
  openDialog() {
    this.organizationService.openCreateOrganizatioPopup()
  }
  openAddUser() {
    this.addNewUserService.openAddUser
  }

}
