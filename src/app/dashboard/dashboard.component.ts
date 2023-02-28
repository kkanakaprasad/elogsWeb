import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrganizationService } from '../organization/organization.service';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { RouteConstants } from '../shared/constants/routes.constants';
import { StorageService } from '../shared/services/storage-service/storage.service';
import { AddNewUserService } from '../user/add-new-user/add-new-user.service';
import { STORAGE_KEYS } from '../shared/enums/storage.enum';
import { Roles } from '../shared/enums/roles.enums';
import { ActivityService } from '../activity/activity.service';
import { OverDueTaskSearchCriteria, UpComingTaskSearchCriteria, UserSearchCriteria } from '../user/user-list/user-Interface';
import { UserService } from '../user/user.service';
import { DashboardService } from './dashboard.service';
import { SelectedOrganizationService } from '../shared/services/selected-organizions/selected-organization.service';
import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userRole: any;
  selectedDate: any;
  activityTypesData: any;
  selectedActivityId: any;
  selectedStartDate: any;
  selectedEndDate: any;
  dashboardMetricsCount: any;
  dueDateDashBoarData: any;
  relatedToMetricsData: any;
  totalRelatedToMetricsData: any;
  logedinUserDetails: any;
  userMetricsCount: any;
  organizationsMetricsCount: any;
  selectedOrganizationIds: any;
  overDueActivities: any = [];
  upComingActivities: any = [];
  isSuperAdmin!: boolean;
  todoActivitiesCount: any;



  constructor(
    private organizationService: OrganizationService,
    private storageService: StorageService,
    private confirmationDialogService: ConfirmationDialogService,
    private router: Router,
    private addNewUserService: AddNewUserService,
    private activityService: ActivityService,
    private userService: UserService,
    private dashboardService: DashboardService,
    private selectedOrganizationService: SelectedOrganizationService,
    private profileService: ProfileService,
  ) { }

  ngOnInit(): void {
    this.profileService.getUserById(this.storageService.getDataFromLocalStorage(STORAGE_KEYS.USER_ID)).subscribe((res: any) => { })
    this.isSuperAdmin = this.storageService.getDataFromLocalStorage(STORAGE_KEYS.ROLE) === Roles.SuperAdmin ? true : false;
    this.selectedOrganizationService.getSelectedOrganization().subscribe((res) => {
      this.selectedOrganizationIds = res;
      this.getOverDueTaskForDashBoard();
      this.getUpComingTaskForDashBoard();
      this.postDashBoardDueDateMetrics();
      this.postDashBoardRelatedToMetrics();
      this.postDashBoardActivityMetrics();
    })
    this.userRole = this.storageService.getDataFromLocalStorage(STORAGE_KEYS.ROLE);
    this.getActivityMasterData();
    if(this.isSuperAdmin){
    this.dashboardService.postDashBoardActivityMetrics({}).subscribe(res => {
      this.dashboardMetricsCount = res.data[0]
    })
  }
    this.postDashBoardDueDateMetrics();
    this.postDashBoardRelatedToMetrics();
    this.userDetails();
    this.getUserMetricsForDashBoard();
    this.getOrganizationsMetricsForDashBoard();
  }
  openDialog() {
    this.organizationService.openCreateOrganizatioPopup()
  }
  openAddUser() {
    this.addNewUserService.openAddUser()
  }

  createOrganization() {
    this.organizationService.openCreateOrganizatioPopup();
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

  getActivityMasterData() {
    this.activityService.getActivitiesMasterData().subscribe(res => {
      this.activityTypesData = res?.data?.activityTypesData;

    })
  }

  postDashBoardActivityMetrics() {
    const payload = {
      organizations: this.selectedOrganizationIds,
      dateRange: {
        fromDate: this.selectedStartDate,
        toDate: this.selectedEndDate
      },
      type: this.selectedActivityId
    }
     this.dashboardService.postDashBoardActivityMetrics(payload).subscribe(res => {
      this.dashboardMetricsCount = res.data[0]

    })
  }
  startDateSetter(selectedOptionalDate?: any) {
    this.selectedStartDate = selectedOptionalDate.value
    this.postDashBoardActivityMetrics()

  }
  endDateSetter(selectedOptionalDate?: any) {
    this.selectedEndDate = selectedOptionalDate.value
    this.postDashBoardActivityMetrics()

  }
  selectedActivityType(event: any) {
    this.selectedActivityId = event.value
    this.postDashBoardActivityMetrics()
  }

  postDashBoardDueDateMetrics() {
    if (this.userRole == "user") {
      this.dashboardService.postDashBoardDueDateMetrics({ organizations: this.selectedOrganizationIds }).subscribe(res => {
        this.dueDateDashBoarData = res.data[0]
      })
    } else {
      this.dashboardService.postDashBoardDueDateMetrics({ organizations: this.selectedOrganizationIds }).subscribe(res => {
        this.dueDateDashBoarData = res.data[0]
      })
    }

  }

  postDashBoardRelatedToMetrics() {
    this.dashboardService.postDashBoardRelatedToMetrics({ organizations: this.selectedOrganizationIds }).subscribe(res => {
      this.relatedToMetricsData = res.data[0]
    })
  }

  userDetails() {
    const payload: UserSearchCriteria = {
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
      this.logedinUserDetails = res.data.users[0];
    })
  }

  getUserMetricsForDashBoard() {
    this.dashboardService.getUserMetricsForDashBoard().subscribe(res => {
      this.userMetricsCount = res[0]
    })
  }

  getOrganizationsMetricsForDashBoard() {
    this.dashboardService.getOrganizationsMetricsForDashBoard().subscribe(res => {
      this.organizationsMetricsCount = res?.data[0]
    })
  }

  getOverDueTaskForDashBoard() {
    const payload: OverDueTaskSearchCriteria = {
      pageNumber: 0,
      pageSize: 5,
      sortField: "",
      title: "",
      sortOrder: 1,
      isArchive: false,
      organizations: this.selectedOrganizationIds,
      dueDate: { "customString": "OVERDUE" }
    }
    this.activityService.getActivitiesSearchCriteria(payload).subscribe((res) => {
      this.overDueActivities = res?.data[0].activities;
    })
  }

  getUpComingTaskForDashBoard() {
    const todayDate = new Date();
    const payload: UpComingTaskSearchCriteria = {
      pageNumber: 0,
      pageSize: 5,
      sortField: "",
      title: "",
      sortOrder: 1,
      isArchive: false,
      organizations: this.selectedOrganizationIds,
      status: ["NEW", "INPROGRESS"],
      dueDate: { "fromDate": todayDate }
    }
    this.activityService.getActivitiesSearchCriteria(payload).subscribe((res) => {
      this.upComingActivities = res?.data[0].activities;
      this.todoActivitiesCount = res?.data[0].count[0].count;
    })
  }

  navigateToActivityDetails(activity: any) {
    this.router.navigate([RouteConstants.ACTIVITY_DETAILS], { queryParams: { aId: activity } });
  }


  goToActivityList() {
    const activityPayload = {
      "pageNumber": 0,
      "pageSize": 10,
      "sortField": "",
      "sortOrder": 1,
      "isArchive": false,
      "onlyMyTasks": false,
      "types": [],
      "status": ["INPROGRESS", "NEW"],
      "entryTypes": [],
      "scope": [],
      "priority": [],
      "geography": [],
      "organizations": []
    }
    this.storageService.setDataToLocalStorage(STORAGE_KEYS.ACTIVITY_FILTERS, JSON.stringify(activityPayload))
    this.router.navigate([RouteConstants.ACTIVITY]);
  }

}
