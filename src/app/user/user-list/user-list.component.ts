import { Component, OnInit } from '@angular/core';
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
import { RemoveOrgPopUpService } from './remove-org-pop-up/remove-org-pop-up.service';
import { UserSearchCriteria } from './user-Interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public usersList: any;
  filters = FILTER_CONSTANT
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
  constructor(private userService: UserService,
    private addNewUserService: AddNewUserService,
    private profileService: ProfileService,
    private storageService: StorageService,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService,
    private removeOrgPopUpService: RemoveOrgPopUpService,
    private alertpopupService: AlertpopupService
  ) { }

  ngOnInit(): void {
    this.userSearchCriteria(this.userPayload);
  }

  userSearchCriteria(payload: UserSearchCriteria) {
    this.userService.userSearchCriteria(payload).subscribe((res) => {
      this.usersList = res.users[0].users;
    })
  }

  edit(userId: string) {
    this.addNewUserService.openUpdateUserPopup(userId).afterClosed().subscribe((res) => {
      console.log(res);
    })
  }

  removeOrganisation(userId: any) {
    this.removeOrgPopUpService.removeOrgPopUp(userId).afterClosed().subscribe((res) => {
      if (res)
        this.userSearchCriteria(this.userPayload);
    });
  }

  disableUser(userID: string) {
    var obj = {
      isActive: false
    }
    this.confirmationDialogService.open({
      message: 'Are you sure want to disable!!'
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.profileService.inActiveUser(userID, obj).subscribe((res) => {
          this.alertpopupService.open({
            message: res.message,
            action: 'ok'
          })
          this.userSearchCriteria(this.userPayload);
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
    if (Number(user.tab.textLabel) === FILTER_CONSTANT.IS_ACTIVE) {
      this.userPayload.isActive = true;
      this.updateUserDetails(this.userPayload);
    }
    else if (Number(user.tab.textLabel) === FILTER_CONSTANT.MY_PROFILE) {
      this.userPayload.role = organizationType.SUPERADMIN;
      this.updateUserDetails(this.userPayload);
    }
    else if (Number(user.tab.textLabel) === FILTER_CONSTANT.INACTIVE) {
      this.userPayload.isActive = false;
      this.updateUserDetails(this.userPayload);
    }
    else if (Number(user.tab.textLabel) === FILTER_CONSTANT.MINISTRIES) {
      this.userPayload.type = organizationType.MINISTRY
      this.updateUserDetails(this.userPayload);
    }
    else if (Number(user.tab.textLabel) === FILTER_CONSTANT.ASSOCIATION) {
      this.userPayload.type = organizationType.ASSOCIATION
      this.updateUserDetails(this.userPayload);
    }

    // switch (Number(user.tab.textLabel)) {
    //   case FILTER_CONSTANT.IS_ACTIVE: {
    //     this.userPayload.isActive = true;
    //     this.updateUserDetails(this.userPayload);
    //     break;
    //   }
    //   case FILTER_CONSTANT.INACTIVE: {
    //     this.userPayload.isActive = false;
    //     this.updateUserDetails(this.userPayload);
    //     break;
    //   }
    //   case FILTER_CONSTANT.MY_PROFILE: {
    //     this.userPayload.role = organizationType.SUPERADMIN;
    //     this.updateUserDetails(this.userPayload);
    //     break;
    //   }
    //   case FILTER_CONSTANT.MINISTRIES: {
    //     this.userPayload.role = organizationType.MINISTRY;
    //     this.updateUserDetails(this.userPayload);
    //     break;
    //   }
    //   case FILTER_CONSTANT.ASSOCIATION: {
    //     this.userPayload.role = organizationType.ASSOCIATION;
    //     this.updateUserDetails(this.userPayload);
    //     break;
    //   }
    //   default: {
    //     break;
    //   }
    // }
  }

}
