import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileSearchCriteria, UpdateProfileSearchCriteria } from 'src/app/profile/profile.interface';
import { ProfileService } from 'src/app/profile/profile.service';
import { AlertpopupService } from 'src/app/shared/alertPopup/alertpopup.service';
import { ConfirmationDialogService } from 'src/app/shared/confirmation-dialog/confirmation-dialog.service';
import { FILTER_CONSTANT } from 'src/app/shared/constants/filter.constants';
import { organizationType } from 'src/app/shared/constants/organizationType';
import { RouteConstants } from 'src/app/shared/constants/routes.constants';
import { StorageService } from 'src/app/shared/services/storage-service/storage.service';
import { AddNewUserService } from '../add-new-user/add-new-user.service';
import { UserService } from '../user.service';
import { AssignOrganizationPopUpService } from './assign-organization-pop-up/assign-organization-pop-up.service';
import { RemoveOrgPopUpService } from './remove-org-pop-up/remove-org-pop-up.service';
import { UserSearchCriteria } from './user-Interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CUSTOMPAGE } from '../../../app/shared/constants/pagination';
import { STORAGE_KEYS } from 'src/app/shared/enums/storage.enum';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public usersList: any = [];
  filters = FILTER_CONSTANT
  customPage = CUSTOMPAGE;

  userTypes: any;
  userPayload: UserSearchCriteria = {
    pageNumber: 0,
    pageSize: 50,
    sortField: "",
    sortOrder: 0,
    type: "",
    isActive: true,
    role: "",
    userId: "",
    user: ""
  }

  displayedColumns = ['Name', 'Email', 'Organization', 'Actions']
  dataSource = new MatTableDataSource(this.usersList);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService,
    private addNewUserService: AddNewUserService,
    private profileService: ProfileService,
    private storageService: StorageService,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService,
    private removeOrgPopUpService: RemoveOrgPopUpService,
    private alertpopupService: AlertpopupService,
    private assignOrganizationPopUpService: AssignOrganizationPopUpService
  ) { }

  ngOnInit(): void {
    this.userSearchCriteria(this.userPayload);
  }

  userSearchCriteria(payload: any) {
    this.userService.userSearchCriteria(payload).subscribe((res) => {
      this.usersList = res.users[0].users;
      this.dataSource = new MatTableDataSource(this.usersList);
      this.dataSource.paginator = this.paginator;
    })
  }
  get loginUserID() {
    return this.storageService.getDataFromLocalStorage(STORAGE_KEYS.USER_ID)
  }

  editUser(userId: string) {
    this.addNewUserService.openUpdateUserPopup(userId).afterClosed().subscribe((res) => {
      this.userSearchCriteria(this.userPayload);
    })
  }

  assignOrganisation(user: any) {
    this.assignOrganizationPopUpService.assignOrgPopUp(user).afterClosed().subscribe((res) => {
      if (res)
        this.userSearchCriteria(this.userPayload);
    });
  }

  removeOrganisation(userId: any) {
    this.removeOrgPopUpService.removeOrgPopUp(userId).afterClosed().subscribe((res) => {
      if (res)
        this.userSearchCriteria(this.userPayload);
    });
  }

  disableOrenableUser(userID: string, isEnable: boolean) {
    var obj = {
      isActive: isEnable
    }
    this.confirmationDialogService.open({
      message: isEnable ? 'Are you sure want to enable!!' : 'Are you sure want to disable!!'
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.profileService.inActiveUser(userID, obj).subscribe((res) => {
          this.alertpopupService.open({
            message: isEnable ? 'User enabled successfully' : 'User disabled successfully',
            action: 'ok'
          })
          let updatedPayload = this.userPayload;
          updatedPayload = {
            ...updatedPayload,
            isActive: !isEnable,
          }
          this.userSearchCriteria(updatedPayload);
        })
      }
    })
  }

  AddUser() {
    this.addNewUserService.openAddUser();
  }

  updateUserDetails(payload: UpdateProfileSearchCriteria) {
    this.profileService.getUsersBySearchCriteria(payload).subscribe((res) => {
      this.usersList = res.users[0].users
    })
  }

  applyUserFilters(user: any) {
    let updatedPayload = this.userPayload;
    if (Number(user.tab.textLabel) === FILTER_CONSTANT.IS_ACTIVE) {
      updatedPayload = {
        ...updatedPayload,
        isActive: true,
      }
    }
    else if (Number(user.tab.textLabel) === FILTER_CONSTANT.MY_PROFILE) {
      var userID = this.storageService.getDataFromLocalStorage(STORAGE_KEYS.USER_ID);
      updatedPayload = {
        ...updatedPayload,
        isActive: true,
        userId: userID
      }
    }
    else if (Number(user.tab.textLabel) === FILTER_CONSTANT.INACTIVE) {
      updatedPayload = {
        ...updatedPayload,
        isActive: false,
      }
    }
    else if (Number(user.tab.textLabel) === FILTER_CONSTANT.MINISTRIES) {
      updatedPayload = {
        ...updatedPayload,
        isActive: true,
        type: organizationType.MINISTRY
      }
    }
    else if (Number(user.tab.textLabel) === FILTER_CONSTANT.ASSOCIATION) {
      updatedPayload = {
        ...updatedPayload,
        isActive: true,
        type: organizationType.ASSOCIATION
      }
    }
    this.userSearchCriteria(updatedPayload);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onChangedPageSize(event: any) {
    console.log(event);
  }
}
