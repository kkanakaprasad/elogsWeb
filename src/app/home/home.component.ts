import { Component, createComponent, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateOrganizationComponent } from '../organization/create-organization/create-organization.component';
import { AddNewUserComponent } from '../user/add-new-user/add-new-user.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.matDialog.open(CreateOrganizationComponent, {
      width: '500px'
    })
  }
  openAddUser() {
    this.matDialog.open(AddNewUserComponent, {
      width: '500px'
    })
  }

}
