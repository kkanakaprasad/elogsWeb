import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrganizationService } from '../organization/organization.service';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { RouteConstants } from '../shared/constants/routes.constants';
import { StorageService } from '../shared/services/storage-service/storage.service';
import { AddNewUserService } from '../user/add-new-user/add-new-user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private matDialog: MatDialog, 
    private organizationService:OrganizationService,
    private storageService: StorageService,
    private confirmationDialogService :ConfirmationDialogService,
    private router : Router,
    private addNewUserService :AddNewUserService) { }

  ngOnInit(): void {
  }
  openDialog() {
    this.organizationService.openCreateOrganizatioPopup()
  }
  openAddUser() {
    this.addNewUserService.openAddUser()
  }

  createOrganization(){
    this.organizationService.openCreateOrganizatioPopup();
  }

  logout(){
    this.confirmationDialogService.open({
      message: 'Are you Sure to Logout!!'
    }).afterClosed().subscribe((res)=>{
      if(res){
        this.storageService.clearLocalStorage();
        this.router.navigate([RouteConstants.HOME])
      }
    })
  }
  
}
