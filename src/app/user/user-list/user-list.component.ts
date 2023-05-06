import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { PaginationProps } from '../../../app/shared/constants/pagination';
import { STORAGE_KEYS } from 'src/app/shared/enums/storage.enum';
import { Roles } from 'src/app/shared/enums/roles.enums';
import { SearchTriggerService } from 'src/app/shared/services/search-trigger-service/search-trigger.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit, OnDestroy {
  public usersList: any = [];
  filters = FILTER_CONSTANT
  paginationProps = PaginationProps;
  selectedTab = {
    tab: {
      textLabel: FILTER_CONSTANT.IS_ACTIVE
    }
  };
  userTypes: any;
  userPayload: UserSearchCriteria = {
    pageNumber: 0,
    pageSize: 10,
    sortField: "",
    sortOrder: 1,
    type: "",
    isActive: true,
    role: "",
    userId: "",
    user: ""
  }
  activeMetricsCount: number = 0;
  adminMetricsCount: number = 0;
  associationsMetricsCount: number = 0;
  ministriesMetricsCount: number = 0;
  inActiveMetricsCount: number = 0;
  totalUserCount: number = 0;
  userSerachSubscription : any;

  displayedColumns = ['Name', 'lastActivity', 'CreatedAt', 'Organization', 'Actions']
  dataSource = new MatTableDataSource(this.usersList);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  selectedTabTextLableNumber: any;
  roles = Roles

  constructor(private userService: UserService,
    private addNewUserService: AddNewUserService,
    private profileService: ProfileService,
    private storageService: StorageService,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService,
    private removeOrgPopUpService: RemoveOrgPopUpService,
    private alertpopupService: AlertpopupService,
    private assignOrganizationPopUpService: AssignOrganizationPopUpService,
    private searchTriggerService : SearchTriggerService,
  ) { }

  ngOnInit(): void {
    this.userSearchCriteria(this.userPayload);
    this.userSerachSubscription = this.searchTriggerService.getSearchData().subscribe((res:any)=>{
      if(res){
        this.userPayload = {
          ...this.userPayload,
          searchTerm : res
        }
        this.userSearchCriteria(this.userPayload);
      }
    })

  }

  userSearchCriteria(payload: any) {
    this.userService.userSearchCriteria(payload).subscribe((res) => {
      this.activeMetricsCount = res.data.metrics[0].active[0]?.activeUsers;
      this.associationsMetricsCount = res.data.metrics[0].associations[0]?.associationCount;
      this.ministriesMetricsCount = res.data.metrics[0].ministries[0]?.ministriesCount;
      this.inActiveMetricsCount = res.data.metrics[0].inActive[0]?.inActiveUsers;
      if (this.selectedTabTextLableNumber ==="4") {
        this.usersList = res.data.users.filter((res: any) => Roles.SuperAdmin === res.roles[0])
        this.dataSource = new MatTableDataSource(this.usersList);
      }
      else {
        this.usersList = res.data.users.filter((res: any) => Roles.SuperAdmin !== res.roles[0])
        this.dataSource = new MatTableDataSource(this.usersList);
      }
      this.totalUserCount = res.data.totalCount;
    })
  }
  get loginUserID() {
    return this.storageService.getDataFromLocalStorage(STORAGE_KEYS.USER_ID)
  }

  editUser(userId: string) {
    this.addNewUserService.openUpdateUserPopup(userId).afterClosed().subscribe((res) => {
      if (res) {
        this.applyUserFilters(this.selectedTab);
      }
    })
  }

  assignOrganisation(user: any) {
    this.assignOrganizationPopUpService.assignOrgPopUp(user).afterClosed().subscribe((res) => {
      if (res) {
        this.applyUserFilters(this.selectedTab);
      }
    });
  }

  removeOrganisation(userId: any) {
    this.removeOrgPopUpService.removeOrgPopUp(userId).afterClosed().subscribe((res) => {
      if (res)
        this.applyUserFilters(this.selectedTab);
    });
  }

  disableOrenableUser(userData: any, isEnable: boolean) {
    var obj = {
      isActive: isEnable
    }
    this.confirmationDialogService.open({
      message: isEnable ? `Are you sure want to enable ${userData.Name}` : `Are you sure want to disable ${userData.Name}`
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.profileService.inActiveUser(userData._id, obj).subscribe((res) => {
          this.alertpopupService.open({
            message: isEnable ? 'User enabled successfully' : 'User disabled successfully',
            action: 'ok'
          })
          this.applyUserFilters(this.selectedTab);
        })
      }
    })
  }

  addUser() {
    this.addNewUserService.openAddUser().afterClosed().subscribe((res) => {
      if (res) {
        this.userSearchCriteria(this.userPayload);
      }
    })
  }

  updateUserDetails(payload: UpdateProfileSearchCriteria) {
    this.profileService.getUsersBySearchCriteria(payload).subscribe((res) => {
      this.usersList = res.users[0].users
    })
  }

  applyUserFilters(user: any) {
    this.selectedTab = user;
    let updatedPayload = {};
    if (Number(user.tab.textLabel) === FILTER_CONSTANT.IS_ACTIVE) {
      updatedPayload = {
        isActive: true,
        pageNumber: 0,
        userId: '',
        type: ''
      }
    }
    else if (Number(user.tab.textLabel) === FILTER_CONSTANT.MY_PROFILE) {
      var userID = this.storageService.getDataFromLocalStorage(STORAGE_KEYS.USER_ID);
      updatedPayload = {
        isActive: true,
        userId: userID,
        pageNumber: 0,
        type: ''
      }
    }
    else if (Number(user.tab.textLabel) === FILTER_CONSTANT.INACTIVE) {
      updatedPayload = {
        isActive: false,
        pageNumber: 0,
        userId: '',
        type: ''
      }
    }
    else if (Number(user.tab.textLabel) === FILTER_CONSTANT.MINISTRIES) {
      updatedPayload = {
        isActive: true,
        type: organizationType.MINISTRY,
        pageNumber: 0,
        userId: '',

      }
    }
    else if (Number(user.tab.textLabel) === FILTER_CONSTANT.ASSOCIATION) {
      updatedPayload = {
        isActive: true,
        type: organizationType.ASSOCIATION,
        pageNumber: 0,
        userId: '',
      }
    }
    this.userPayload = { ...this.userPayload, ...updatedPayload }
    this.selectedTabTextLableNumber = user.tab.textLabel
    this.userSearchCriteria(this.userPayload);
  }

  onChangedPageSize(event: any) {
    this.userPayload.pageNumber = this.paginator.pageIndex;
    this.userPayload.pageSize = this.paginator.pageSize;
    this.userSearchCriteria(this.userPayload);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(){
    this.userSerachSubscription.unsubscribe();
  }

}
