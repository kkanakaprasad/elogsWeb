import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrganizationService } from '../organization/organization.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { StorageService } from '../shared/services/storage-service/storage.service';
import { AddNewUserService } from '../user/add-new-user/add-new-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private organizationService:OrganizationService,
    private storageService: StorageService,
    private confirmationDialogService :ConfirmationDialogService,
    private router : Router,
    private addNewUserService :AddNewUserService) { }

  ngOnInit(): void {
  }

  sidebarShow(){
    const bodyElement = document.body;
    bodyElement.classList.toggle("toggle_sidebar");

  }

  openCreateOrganizationPopup(){
    this.organizationService.openCreateOrganizatioPopup();
  }

  openCreateUserPopup(){
    this.addNewUserService.openAddUser();
  }

}
