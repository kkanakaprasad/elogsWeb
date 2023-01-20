import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RouteConstants } from '../shared/constants/routes.constants';
import { ActivityService } from './activity.service';
import { MatPaginator } from '@angular/material/paginator';
import { FILTER_CONSTANT } from '../shared/constants/filter.constants';
import { CUSTOMPAGE } from '../shared/constants/pagination';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';
import { StorageService } from '../shared/services/storage-service/storage.service';
import { STORAGE_KEYS } from '../shared/enums/storage.enum';
import { Roles } from '../shared/enums/roles.enums';
import { ActivityFiltersData } from './activity-filterData';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivityRowActions, Status, SuperAdminActivityRowActions } from './activity.constant';
import { UserDetailsService } from '../shared/services/user-details-service/user-details.service';
import { AlertpopupService } from '../shared/alertPopup/alertpopup.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();


@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})


export class ActivityComponent implements OnInit {

  activityId = '';
  displayedColumns = ['select', 'Status', 'Activity', 'Title', 'Priority', 'Duedate', 'Assignto', 'actions'];
  activityFiltersData = ActivityFiltersData;
  currentStatus = Status
  superAdminActivityRowActions = SuperAdminActivityRowActions;
  userActivityRowActions = ActivityRowActions;
  dataSource: any;
  masterData: any;
  statusEnums = Status
  public activitylist: any = [];
  filter = FILTER_CONSTANT;
  customPage = CUSTOMPAGE;
  isSuperAdmin: boolean = false;
  logedInUserDetails: any;
  selectedActivtyForRowActions: any;
  activityRowActionByStatus: any;
  userActivityRowActionByStatus: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isShowCustomCreatedDate: boolean = false;
  isShowCustomDueDate: boolean = false;

  selection: any = new SelectionModel(true, []);
  filters: any = {
    types: [],
    status: [],
    entryType: [],
    scope : [],
    priority : [],
    sectors : []
  }

  customCreatedDate = new FormGroup({
    fromDate: new FormControl<Date | null>(null),
    toDate: new FormControl<Date | null>(null),
  });

  customDueDate = new FormGroup({
    fromDate: new FormControl<Date | null>(null),
    toDate: new FormControl<Date | null>(null),
  });

  createdDate = new FormControl();
  dueDte = new FormControl();

  activitySearchCriteriaPayload: any = {
    pageNumber: 0,
    pageSize: 20,
    sortField: "",
    sortOrder: 0,
  }

  showFilteredChips : any = [];

  constructor(
    private activityService: ActivityService,
    private storageService: StorageService,
    private router: Router,
    private userDetailsService: UserDetailsService,
    private alertpopupService: AlertpopupService,
    private confirmationDialogService: ConfirmationDialogService
  ) { }

  ngOnInit(): void {
    this.getActivitiesSearchCriteria();
    this.getAllActivities();
    this.getAcivityMasterData();
    this.isSuperAdmin = this.storageService.getDataFromLocalStorage(STORAGE_KEYS.ROLE) === Roles.SuperAdmin ? true : false;
    this.getLogedinUserDetails();
    this.customCreatedDate.valueChanges.subscribe((res) => {
      if (res.fromDate !== null && res.toDate !== null) {
        this.activitySearchCriteriaPayload = {
          ...this.activitySearchCriteriaPayload,
          createdDate: {
            fromDate: res.fromDate?.toISOString(),
            toDate: res.toDate?.toISOString()
          }
        }
        this.getActivitiesSearchCriteria();
      }
    });

    this.customDueDate.valueChanges.subscribe((res) => {
      if (res.fromDate !== null && res.toDate !== null) {
        this.activitySearchCriteriaPayload = {
          ...this.activitySearchCriteriaPayload,
          dueDate: {
            fromDate: res.fromDate?.toISOString(),
            toDate: res.toDate?.toISOString()
          }
        }
      }
      this.getActivitiesSearchCriteria();
    });
  }

  getActivitiesSearchCriteria(){
    this.activityService.getActivitiesSearchCriteria(this.activitySearchCriteriaPayload).subscribe((res)=>{
      this.dataSource = new MatTableDataSource(res[0].schedules)
      this.dataSource.paginator = this.paginator;
    })
  }

  getLogedinUserDetails() {
    this.userDetailsService.getUserDetails().subscribe((res) => {
      this.logedInUserDetails = res;
    })
  }

  downloadFile() {

  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource?.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  getAllActivities() {
    this.activityService.getAllActivities().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res?.data.reverse())
      console.log(res?.data)
      this.dataSource.paginator = this.paginator;

    })
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  onChangedPageSize(event: any) {
    console.log(event);
  }

  sortChange(sortState: Sort) {
    console.log(sortState);

  }

  getAcivityMasterData() {
    this.activityService.getActivityMastarData().subscribe((res) => {
      if (res.data) {
        this.masterData = res.data;
      }
    })
  }

  navigateToActivityDetails(activityId: any) {
    this.router.navigate([RouteConstants.ACTIVITY_DETAILS], { queryParams: { aId: activityId } });
  }

  generateActivityRowActions(status: "NEW" | "INPROGRESS" | "RESOLVED" | "REJECTED", activity?: any) {
    this.selectedActivtyForRowActions = activity;
    this.activityRowActionByStatus = this.superAdminActivityRowActions[status];
    this.userActivityRowActionByStatus = this.userActivityRowActions.filter(action => {
      return action.displayCondition(activity, this.logedInUserDetails);
    })
  }

  onActivityRowActionClick(action: string) {
    switch (action) {
      case 'NEW':
        this.updateActivityStatus(action);
        break;
      case 'INPROGRESS':
        this.updateActivityStatus(action);
        break;
      case 'RESOLVED':
        this.updateActivityStatus(action);
        break;
      case 'REJECTED':
        this.updateActivityStatus(action);
        break;
      case 'REPLAY':
        this.navigateToActivityDetails(this.selectedActivtyForRowActions._id);
        break;
      case 'ARCHIVE':
        this.updateArchivestatus();
        break;
      case 'DELETE':
        this.deleteActivityByActivityId();
        break;
      case 'MOVE_TO_ORGANIZATION':
        this.activityService.openMoveToOrganizationPopup(this.selectedActivtyForRowActions._id).afterClosed().subscribe((res)=>{
          console.log(res);
        })
        break;
      default:
        break;
    }

  }

  updateActivityStatus(status: string) {

    this.confirmationDialogService.open({
      message: `Are you sure to change status to ${status}`
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.activityService.updateActivityStatus(this.selectedActivtyForRowActions._id, { status: status }).subscribe((res) => {
          this.alertpopupService.open({
            message: 'Activity Status Updated Successfully',
            action: 'ok'
          });
          this.getAllActivities();
        })
      }
    }, (error) => {
      this.alertpopupService.open({
        message: error.message ? error.message : "Unable to update Activity status",
        action: 'ok'
      });
    })
  }


  updateArchivestatus() {
    this.confirmationDialogService.open({
      message: `Are you sure to Archive the activity`
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.activityService.updateArchivestatus(this.selectedActivtyForRowActions._id, { isArchive: true }).subscribe((res) => {
          this.alertpopupService.open({
            message: 'Activity Archived Successfully',
            action: 'ok'
          });
          this.getAllActivities();
        })
      }
    }, (error) => {
      this.alertpopupService.open({
        message: error.message ? error.message : "Unable to archive Activity status",
        action: 'ok'
      });
    })
  }

  deleteActivityByActivityId() {
    this.confirmationDialogService.open({
      message: `Are you sure to Delete activity`
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.activityService.deleteSelectedActivity(this.selectedActivtyForRowActions._id).subscribe((res) => {
          this.alertpopupService.open({
            message: 'Activity Deleted Successfully',
            action: 'ok'
          });
          this.getAllActivities();
        })
      }
    }, (error) => {
      this.alertpopupService.open({
        message: error.message ? error.message : "Unable to delete Activity status",
        action: 'ok'
      });
    })
  }

  filterActivityListData(controlName: string, event?: any) {
    switch (controlName) {
      case 'createdDate':
        console.log(event?.source?.value)
        const value = event?.source?.value;
        if (value?.unit === "R") {
          this.isShowCustomCreatedDate = true;
        } else if(value === "ALL") {
          this.activitySearchCriteriaPayload = {...this.activitySearchCriteriaPayload , createdDate : ''}
        }else{
          this.activitySearchCriteriaPayload = {...this.activitySearchCriteriaPayload , createdDate : value}
        }
        console.log(this.activitySearchCriteriaPayload);
        break;
      case 'dueDate' :
        const dueDate = event?.source?.value;
        if (dueDate === "R") {
          this.isShowCustomDueDate = true;
        } else if(dueDate === "ALL") {
          this.activitySearchCriteriaPayload = {...this.activitySearchCriteriaPayload , dueDate : ''}
        }else{
          this.activitySearchCriteriaPayload = {...this.activitySearchCriteriaPayload , dueDate : {customString : dueDate}}
        }
        break;
    }
  }

  activityListFilterOnChanged(event : any , type : string){
    console.log(event, type); 
    if (event.checked) {
      this.filters[type].push(event.source.value);
    } else {
      let index = this.filters[type].findIndex((d: any) => d === event.source.value);
      this.filters[type].splice(index, 1);
    }
    this.activitySearchCriteriaPayload = {...this.activitySearchCriteriaPayload,...this.filters};
    console.log(this.activitySearchCriteriaPayload);
    this.getActivitiesSearchCriteria();
    this.showFilteredChips = [...this.activitySearchCriteriaPayload.types,
      ...this.activitySearchCriteriaPayload.status,
      ...this.activitySearchCriteriaPayload.entryType,
      ...this.activitySearchCriteriaPayload.scope,
      ...this.activitySearchCriteriaPayload.priority,
      ...this.activitySearchCriteriaPayload.sectors,]

    console.log(this.showFilteredChips);
  }

}



