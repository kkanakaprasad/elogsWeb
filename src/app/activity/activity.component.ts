import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RouteConstants } from '../shared/constants/routes.constants';
import { ActivityService } from './activity.service';
import { MatPaginator } from '@angular/material/paginator';
import { FILTER_CONSTANT } from '../shared/constants/filter.constants';
import { PaginationProps } from '../shared/constants/pagination';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';
import { StorageService } from '../shared/services/storage-service/storage.service';
import { STORAGE_KEYS } from '../shared/enums/storage.enum';
import { Roles } from '../shared/enums/roles.enums';
import { ActivityFiltersData } from './activity-filterData';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivitiesDownloadHeaders, ActivityRowActions, Status, SuperAdminActivityRowActions } from './activity.constant';
import { UserDetailsService } from '../shared/services/user-details-service/user-details.service';
import { AlertpopupService } from '../shared/alertPopup/alertpopup.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { BehaviorSubject } from 'rxjs';
import { BreadcrumbService } from '../main/breadcrumb/breadcrumb.service';
import { CsvHelperService } from '../shared/services/csv-helper-service/csv-helper.service';
import { SelectedOrganizationService } from '../shared/services/selected-organizions/selected-organization.service';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();


@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})


export class ActivityComponent implements OnInit {

  displayedColumns = ['select', 'Status', 'Activity', 'Title', 'Priority', 'Duedate', 'Assignto', 'actions'];
  activityFiltersData: any = ActivityFiltersData;
  currentStatus = Status
  superAdminActivityRowActions: any = SuperAdminActivityRowActions;
  userActivityRowActions = ActivityRowActions;
  dataSource: any;
  masterData: any;
  statusEnums = Status
  public activitylist: any = [];
  filter = FILTER_CONSTANT;
  paginationProps = PaginationProps;
  isSuperAdmin: boolean = false;
  logedInUserDetails: any;
  selectedActivtyForRowActions: any;
  activityRowActionByStatus: any;
  userActivityRowActionByStatus: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isShowCustomCreatedDate: boolean = false;
  isShowCustomDueDate: boolean = false;
  activitiesFiltersForm!: FormGroup;
  allCompleteFilters: any = {
    type: false,
    status: false,
    entryType: false,
    scope: false,
    priority: false,
    sectors: false

  }
  totalActivitiesCount: number = 0;


  selection: any = new SelectionModel(true, []);
  filters: any = {
    types: [],
    status: [],
    entryTypes: [],
    scope: [],
    priority: [],
    geography: []
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
  createdDateChipValue: string = "";
  dueDateChipValue: string = "";
  isResetFilters: boolean = false;

  activitySearchCriteriaPayload: BehaviorSubject<any> = new BehaviorSubject({
    pageNumber: 0,
    pageSize: this.paginationProps.pageSize,
    sortField: "",
    sortOrder: 1,
    isArchive: false,
    onlyMyTasks: false
  });
  selectedActivity: any;
  selectedOrganizationIds: any;
  activitiesTabCount:any;

  constructor(
    private activityService: ActivityService,
    private storageService: StorageService,
    private router: Router,
    private userDetailsService: UserDetailsService,
    private alertpopupService: AlertpopupService,
    private confirmationDialogService: ConfirmationDialogService,
    private formBuilder: FormBuilder,
    private breadcrumbService: BreadcrumbService,
    private csvHelperService: CsvHelperService,
    private selectedOrganizationService: SelectedOrganizationService,

  ) { 
    this.isSuperAdmin = this.storageService.getDataFromLocalStorage(STORAGE_KEYS.ROLE) === Roles.SuperAdmin ? true : false;
  }

  ngOnInit(): void {
    this.selectedOrganizationService.getSelectedOrganization().subscribe((res) => {
      this.selectedOrganizationIds = res;
      this.getActivitiesSearchCriteria();
      this.getTabBasedActivityCount();
    })
    this.getAcivityMasterData();
    this.getLogedinUserDetails();
    this.customCreatedDate.valueChanges.subscribe((res) => {
      if (res.fromDate !== null && res.toDate !== null) {
        let data: any;
        this.activitySearchCriteriaPayload.subscribe((res) => {
          data = res;
        });
        this.activitySearchCriteriaPayload.next({
          ...data,
          createdDate: {
            fromDate: res.fromDate?.toISOString(),
            toDate: res.toDate?.toISOString()
          }
        })
        this.createdDateChipValue = `${res.fromDate?.toDateString()} - ${res.toDate?.toDateString()}`;
      }
    });

    this.customDueDate.valueChanges.subscribe((res) => {
      if (res.fromDate !== null && res.toDate !== null) {
        let data: any;
        this.activitySearchCriteriaPayload.subscribe((res) => {
          data = res;
        });
        this.activitySearchCriteriaPayload.next({
          ...data,
          dueDate: {
            fromDate: res.fromDate?.toISOString(),
            toDate: res.toDate?.toISOString()
          }
        })
        this.dueDateChipValue = `${res.fromDate?.toDateString()} - ${res.toDate?.toDateString()}`;
      }
    });

    this.breadcrumbService.getSelectedActivitiesStatus().subscribe((res: any) => {
      if (res && res.key) {
        res.selected = true;
        this.activityListFilterOnChanged({}, 'status', res);
      }
    })

    this.activitySearchCriteriaPayload.subscribe((res) => {
      this.getActivitiesSearchCriteria()
    });
  }

  getActivitiesSearchCriteria() {
    let payload: any;
    this.activitySearchCriteriaPayload.subscribe((res) => {
      payload = res;
    });
    let result = Object.values(this.filters).every(( array : any) => array.length === 0);

    if (!result || (payload.createdDate && payload.createdDate !== "" ) || (payload.dueDate && payload.dueDate !== "" )) {
      this.isResetFilters = true
    } else {
      this.isResetFilters = false
    }
    payload = {...payload, organizations: this.selectedOrganizationIds}
    this.activityService.getActivitiesSearchCriteria(payload).subscribe((res) => {
      this.totalActivitiesCount = res.data[0]?.count[0]?.count ? res.data[0]?.count[0]?.count : 0;
      this.dataSource = new MatTableDataSource(res.data[0].activities.reverse())
    })
  }

  getLogedinUserDetails() {
    this.userDetailsService.getUserDetails().subscribe((res) => {
      this.logedInUserDetails = res;
    })
  }

  downloadFile() {
    let activityData = this.selection.selected.length === 0 ? this.dataSource.filteredData : this.selection.selected
    let activityDownloadData: any[] = []
    for (let i = 0; i < activityData.length; i++) {
      const activityDataForDownload = {
        title: activityData[i].title,
        description: activityData[i].description.replace(/<[^>]*>/g, ""),
        status: activityData[i].status,
        priority: activityData[i].priority,
        assignedTo: activityData[i].assignTo[0].organization,
        dueDate: activityData[i].dueDate,
        createdDate: activityData[i].createdAt
      };
      activityDownloadData.push(activityDataForDownload)
    }
    const headersList: { propertyName: string, displayName: string }[] = ActivitiesDownloadHeaders
    this.csvHelperService.downloadFile(activityDownloadData, "List of Activities", headersList)

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

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  onChangedPageSize(event: any) {
    let data: any;
    this.activitySearchCriteriaPayload.subscribe((res) => {
      data = res;
    });
    this.activitySearchCriteriaPayload.next({
      ...data,
      pageNumber: event.pageIndex,
      pageSize: event.pageSize
    })
  }

  getAcivityMasterData() {
    this.activityService.getActivityMastarData().subscribe((res) => {
      if (res.data) {
        this.masterData = res.data;
        this.masterData?.activityTypesData.forEach((element: any) => {
          element.selected = false;
        });
        this.masterData?.activityEntryTypesData.forEach((element: any) => {
          element.selected = false;
        });
        this.masterData?.activitySectorsData.forEach((element: any) => {
          element.selected = false;
        });
        this.masterData?.activityScopesData.forEach((element: any) => {
          element.selected = false;
        });

      }
    })
  }

  navigateToActivityDetails(activity: any) {
    this.router.navigate([RouteConstants.ACTIVITY_DETAILS], { queryParams: { aId: activity } });
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
      case 'REPLY':
        this.moveToActivityDetail();
        break;
      case 'ARCHIVE':
        this.updateArchivestatus();
        break;
      case 'DELETE':
        this.deleteActivityByActivityId();
        break;
      case 'EDIT':
        this.editActivityByActivityId();
        break;
      case 'MOVE_TO_ORGANIZATION':
        this.activityService.openMoveToOrganizationPopup(this.selectedActivtyForRowActions._id).afterClosed().subscribe((res) => {

        })
        break;
      default:
        break;
    }

  }

  updateActivityStatus(status: string) {

    this.confirmationDialogService.open({
      message: `Are you sure to change activity ${this.selectedActivtyForRowActions.uniqIdentity} to ${status}`
    }).afterClosed().subscribe((res) => {

      if (res) {
        this.activityService.updateActivityStatus(this.selectedActivtyForRowActions._id, { status: status }).subscribe((res) => {
          this.alertpopupService.open({
            message: 'Activity Status Updated Successfully',
            action: 'ok'
          });
          this.getActivitiesSearchCriteria();
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
      message: `Are you sure to Archive the activity ${this.selectedActivtyForRowActions.uniqIdentity}`
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.activityService.updateArchivestatus(this.selectedActivtyForRowActions._id, { isArchive: true }).subscribe((res) => {
          this.alertpopupService.open({
            message: 'Activity Archived Successfully',
            action: 'ok'
          });
          this.getActivitiesSearchCriteria();
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
      message: `Are you sure to Delete activity ${this.selectedActivtyForRowActions.uniqIdentity}`
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.activityService.deleteSelectedActivity(this.selectedActivtyForRowActions._id).subscribe((res) => {
          this.alertpopupService.open({
            message: 'Activity Deleted Successfully',
            action: 'ok'
          });
          this.getActivitiesSearchCriteria();
        })
      }
    }, (error) => {
      this.alertpopupService.open({
        message: error.message ? error.message : "Unable to delete Activity status",
        action: 'ok'
      });
    })
  }

  editActivityByActivityId() {
    this.router.navigate([RouteConstants.CREATEACTIVITY], { queryParams: { aId: this.selectedActivtyForRowActions._id } })
  }

  moveToActivityDetail() {
    this.router.navigate([RouteConstants.ACTIVITY_DETAILS], { queryParams: { aId: this.selectedActivtyForRowActions._id } });
  }


  filterActivityListData(controlName: string, event: any, chipValue: string) {
    let data: any;
    this.activitySearchCriteriaPayload.subscribe((res) => {
      data = res;
    });
    switch (controlName) {
      case 'createdDate':
        const value = event?.source?.value;
        if (value?.unit === "R") {
          this.isShowCustomCreatedDate = true;
        } else if (value === "ALL") {
          this.activitySearchCriteriaPayload.next({ ...data, createdDate: '' });
          this.isShowCustomCreatedDate = false;
          this.customCreatedDate.reset();
          this.createdDateChipValue = '';
        } else {
          this.activitySearchCriteriaPayload.next({ ...data, createdDate: value });
          this.isShowCustomCreatedDate = false;
          this.customCreatedDate.reset();
          this.createdDateChipValue = chipValue;
        }

        break;
      case 'dueDate':
        const dueDate = event?.source?.value;
        if (dueDate === "R") {
          this.isShowCustomDueDate = true;
        } else if (dueDate === "ALL") {
          this.activitySearchCriteriaPayload.next({ ...data, dueDate: '' });
          this.isShowCustomDueDate = false;
          this.customDueDate.reset();
          this.dueDateChipValue = '';
        } else {
          this.activitySearchCriteriaPayload.next({ ...data, dueDate: { customString: dueDate } });
          this.isShowCustomDueDate = false;
          this.customDueDate.reset();
          this.dueDateChipValue = chipValue;
        }

        break;
    }
  }

  activityListFilterOnChanged(event: any, type: string, selectedOption?: any) {
    if (selectedOption.selected) {
      if (selectedOption._id) {
        this.filters[type].push(selectedOption._id);
      } else {
        this.filters[type].push(selectedOption.key);
      }

    } else {
      if (selectedOption._id) {
        let index = this.filters[type].findIndex((d: any) => d === selectedOption._id);
        this.filters[type].splice(index, 1);
      } else {
        let index = this.filters[type].findIndex((d: any) => d === selectedOption.key);
        this.filters[type].splice(index, 1);
      }
    }
    let data: any;
    this.activitySearchCriteriaPayload.subscribe((res) => {
      data = res;
    });
    this.activitySearchCriteriaPayload.next({ ...data, ...this.filters });

  }

  setAllFiltersToggle(event: any, selectedType: string, dataString: string) {
    if (!this.masterData[dataString]) {
      return;
    }

    this.masterData[dataString].forEach((element: any) => {
      element.selected = event
    });
  }

  removeFilter(filterType: string, index: number, apiType: string, isFromMasterData: boolean) {
    let removedFilterId: string
    if (isFromMasterData) {
      this.masterData[filterType][index].selected = false;
      removedFilterId = this.masterData[filterType][index]._id;
    } else {
      this.activityFiltersData[filterType][index].selected = false;
      removedFilterId = this.activityFiltersData[filterType][index].key;
    }
    let removedIndex = this.filters[apiType].findIndex((d: any) => d === removedFilterId);
    this.filters[apiType].splice(removedIndex, 1);
    let data: any;
    this.activitySearchCriteriaPayload.subscribe((res) => {
      data = res;
    });
    this.activitySearchCriteriaPayload.next({ ...data, ...this.filters });

  }

  removeDateFilter(filterType: string) {
    let data: any;
    this.activitySearchCriteriaPayload.subscribe((res) => {
      data = res;
    });
    switch (filterType) {
      case 'createdDate':
        this.activitySearchCriteriaPayload.next({ ...data, createdDate: '' });
        this.createdDateChipValue = '';
        break;
      case 'dueDate':
        this.activitySearchCriteriaPayload.next({ ...data, dueDate: '' });
        this.dueDateChipValue = '';
        break;
    }
  }

  sortActivityListData(selectedOption: any) {
    let data: any;
    this.activitySearchCriteriaPayload.subscribe((res) => {
      data = res;
    });
    this.activitySearchCriteriaPayload.next({ ...data, sortField: selectedOption.key });
  }

  onActivityTabSelection(type: any) {
    let data: any;
    this.activitySearchCriteriaPayload.subscribe((res) => {
      data = res;
    });
    switch (type.tab.textLabel) {
      case "ALL":
        this.activitySearchCriteriaPayload.next({ ...data, priority: [], dueDate: undefined, onlyMyTasks: false });
        break;
      case "MY_TASKS":
        this.activitySearchCriteriaPayload.next({ ...data, priority: [], dueDate: undefined, onlyMyTasks: true, organizations: this.selectedOrganizationIds });
        break;
      case "OVERDUE":
        this.activitySearchCriteriaPayload.next({ ...data, priority: [], dueDate: { customString: "OVERDUE" }, onlyMyTasks: false });
        break;
      case "HIGH":
        this.activitySearchCriteriaPayload.next({ ...data, priority: ["HIGH"], dueDate: undefined, onlyMyTasks: false });
        break;
      default:
        break;
    }
  }

  resetAllFilters(){
    this.activityFiltersData.status.forEach((element: any) => {
      element.selected = false;
    });
    this.activityFiltersData.priority.forEach((element: any) => {
      element.selected = false;
    });
    this.masterData?.activityTypesData.forEach((element: any) => {
      element.selected = false;
    });
    this.masterData?.activityEntryTypesData.forEach((element: any) => {
      element.selected = false;
    });
    this.masterData?.activitySectorsData.forEach((element: any) => {
      element.selected = false;
    });
    this.masterData?.activityScopesData.forEach((element: any) => {
      element.selected = false;
    });

    this.filters = {
      types: [],
      status: [],
      entryTypes: [],
      scope: [],
      priority: [],
      geography: []
    }

    this.activitySearchCriteriaPayload.next({
      pageNumber: 0,
      pageSize: this.paginationProps.pageSize,
      sortField: "",
      sortOrder: 1,
      isArchive: false,
      onlyMyTasks: false
    });
    this.createdDateChipValue = "";
    this.dueDateChipValue = "";
  }

  getTabBasedActivityCount(){
    const payload = {
      organizations : this.selectedOrganizationIds
    }
    this.activityService.getActivitiesCountForHeaders(payload).subscribe((res)=>{
      this.activitiesTabCount = res.data[0];
    })
  }



}