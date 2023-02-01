import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RouteConstants } from '../shared/constants/routes.constants';
import { ArchiveService } from './archive.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  archiveActivitiesList: any = [];
  taskDisplayedColumns = ['checkbox','Activity', 'Title', 'Status', 'Organisation'];
  fileDisplayedColumns = ['Activity', 'FileName', 'Size', 'Organization'];
  dataSource = new MatTableDataSource(this.archiveActivitiesList);
  selection = new SelectionModel<any>(true, []);
 

  constructor(private archiveService: ArchiveService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.getArchiveActivities();
    
  }

  getArchiveActivities() {
    this.archiveService.getArchiveActivities().subscribe((res) => {
      this.archiveActivitiesList = res.data;
      this.dataSource = new MatTableDataSource(this.archiveActivitiesList);

    })
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  logSelection() {
    this.selection.selected.forEach(value => {});
  }
  navigateToActivityDetails(activity: any) {
    this.router.navigate([RouteConstants.ACTIVITY_DETAILS], { queryParams: { aId: activity } });
  }

  
  archiveActionClick(event:any){
    

  }
}
