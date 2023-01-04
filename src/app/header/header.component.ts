import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrganizationService } from '../organization/organization.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { RouteConstants } from '../shared/constants/routes.constants';
import { Roles } from '../shared/enums/roles.enums';
import { STORAGE_KEYS } from '../shared/enums/storage.enum';
import { StorageService } from '../shared/services/storage-service/storage.service';
import { UserDetails } from '../shared/services/user-details-service/user-details.interface';
import { UserDetailsService } from '../shared/services/user-details-service/user-details.service';
import { AddNewUserService } from '../user/add-new-user/add-new-user.service';
import { UserSearchCriteria } from '../user/user-list/user-Interface';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  logedinUserDetails: UserDetails = {
    Name: '',
    email: '',
    roles: ['']
  }
  isSuperAdmin: boolean = false;

  constructor(private organizationService: OrganizationService,
    private storageService: StorageService,
    private confirmationDialogService: ConfirmationDialogService,
    private router: Router,
    private addNewUserService: AddNewUserService,
    private userService: UserService,
    private userDetailsService: UserDetailsService) { }

  ngOnInit(): void {
    this.userDetails();
    this.isSuperAdmin = this.storageService.getDataFromLocalStorage(STORAGE_KEYS.ROLE) === Roles.SuperAdmin ? true : false
  }

  userDetails() {
    const payload :UserSearchCriteria = {
      pageNumber: 0,
      pageSize: 10,
      sortField: '',
      sortOrder: 0,
      type: '',
      role: '',
      userId: this.storageService.getDataFromLocalStorage(STORAGE_KEYS.USER_ID),
      user: ''
    }
    this.userService.userSearchCriteria(payload).subscribe((res: any) => {
      console.log(res);
      this.logedinUserDetails = res.data.users[0];
      this.userDetailsService.setUserDetails(res.data.users[0]);
    })
  }

  sidebarShow() {
    const bodyElement = document.body;
    bodyElement.classList.toggle("toggle_sidebar");

  }

  openCreateOrganizationPopup() {
    this.organizationService.openCreateOrganizatioPopup();
  }

  openCreateUserPopup() {
    this.addNewUserService.openAddUser();
  }

  logout() {
    this.confirmationDialogService.open({
      message: 'Are you Sure to Logout!!'
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.storageService.clearLocalStorage();
        this.router.navigate([RouteConstants.HOME])
      }
    })
  }
  profile() {

    this.router.navigate([RouteConstants.PROFILE])
  }

  notifications() {
    this.router.navigate([RouteConstants.PROFILE])
  }
  emailReports() {
    this.router.navigate([RouteConstants.PROFILE])
  }
  changetab() {
    this.router.navigate([RouteConstants.PROFILE])
  }

  navigateTomyCompany(){
    this.router.navigate([RouteConstants.COMPANY_SETTINGS])
  }
  navigateToimportandexport(){
    this.router.navigate([RouteConstants.COMPANY_SETTINGS])
  }
  navigateTocatageory(){
    this.router.navigate([RouteConstants.COMPANY_SETTINGS])
  }
}


