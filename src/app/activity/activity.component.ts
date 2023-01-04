import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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


const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

 
  groupby = ['Due Date', 'Status', 'Priority', 'Assigned to']
  sortby = ['Tittle', 'Activity#', 'Due Date', 'Assigned to']
  displayedColumns = ['select', 'Activity', 'Title', 'Priority', 'Duedate']
  createddates = ActivityFiltersData.createddate;
  duedates=ActivityFiltersData.createddate;
  statuses=ActivityFiltersData.status;
  type=ActivityFiltersData.types;
  entryTypes=ActivityFiltersData.entrytype;
  geographys=ActivityFiltersData.geography;
  scopes=ActivityFiltersData.scope;
  priorities=ActivityFiltersData.priority;
  created=ActivityFiltersData.createdby;
  assign=ActivityFiltersData.assignedto;
  groupBy=ActivityFiltersData.groupby;
  sortBy=ActivityFiltersData.sortby;
  dataSource: any;
  public activitylist: any = [];
  filter = FILTER_CONSTANT;
  customPage = CUSTOMPAGE;
  isSuperAdmin: boolean = false;
  selectedTab = {
    tab: {
      textLabel: FILTER_CONSTANT.IS_ACTIVE
    }
  };
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selection: any = new SelectionModel(true, []);
  constructor(
    private activityService: ActivityService,
    private storageService: StorageService
  ) { }

  fromDate = new FormGroup({
    start: new FormControl(new Date(year, month, 13)),
    end: new FormControl(new Date(year, month, 16)),
  });
  toDate = new FormGroup({
    start: new FormControl(new Date(year, month, 15)),
    end: new FormControl(new Date(year, month, 19)),
  });

  ngOnInit(): void {
    this.getAllActivities();
    this.isSuperAdmin = this.storageService.getDataFromLocalStorage(STORAGE_KEYS.ROLE) === Roles.SuperAdmin ? true : false
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
      this.dataSource = new MatTableDataSource(res.data)
      this.dataSource.paginator = this.paginator;

      // this.dataSource.sort = this.sort;
      // const sortState: Sort = { active: 'Title', direction: 'desc' };
      // this.sort.active = sortState.active;
      // this.sort.direction = sortState.direction;
      // this.sort.sortChange.emit(sortState);
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

}
