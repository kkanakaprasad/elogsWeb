import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RouteConstants } from '../shared/constants/routes.constants';
import { ActivityService } from './activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  
  filters=['Created Date','Due Date','Status','Types','Entry Type','GeoGraphy','Scope','Priority','Created By','Assigned to']
  groupby=['Due Date','Status','Priority','Assigned to']
  sortby=['Tittle','Activity#','Due Date','Assigned to']
  displayedColumns = ['Activity', 'Title', 'Priority','Duedate', 'Action']
  dataSource: any;
  selection: any = new SelectionModel(true, []);
  constructor(
    private activityService :ActivityService,
    private router : Router,
  ) { }

  ngOnInit(): void {
    this.getAllActivities();

  }

  downloadFile(){

  }
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
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
  getAllActivities(){
    this.activityService.getAllActivities().subscribe((res) => {
      console.log(res.data);
      
      this.dataSource = new MatTableDataSource( res.data)
  })
}
updateActivity(activity:string){
console.log(activity)
this.router.navigate([RouteConstants.CREATEACTIVITY], { queryParams: { Aid: activity } })
}

}
