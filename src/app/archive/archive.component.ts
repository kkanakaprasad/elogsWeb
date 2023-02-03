import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertpopupService } from '../shared/alertPopup/alertpopup.service';
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
    private router:Router,
    private alertpopupService:AlertpopupService
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

  
  archiveActionClick(type:string){
    if(type==="Restore"){
      const payload={
        activityIds:this.selection.selected.map(res=>res._id),
        isArchive :false
      }
      this.archiveService.postRestoreSelectedActivities(payload).subscribe(res=>{
        if (res) {
            this.alertpopupService.open({
              message:  res?.message ? res?.message : 'Activities archived successfully',
              action: 'ok'
            })
            this.getArchiveActivities();
          }} , (error) => {
            this.alertpopupService.open({
              message: error?.message ? error?.message : 'Failed to archive Activities  ',
              action: 'ok'
            })
          })
    }else if(type==="Remove"){
      this.archiveService.postDeleteSelectedActivities({ activityIds:this.selection.selected.map(res=>res._id)}).subscribe(res=>{
        if (res) {
          this.alertpopupService.open({
            message: res?.message ? res?.message : 'Activities removed successfully',
            action: 'ok'
          })
          this.getArchiveActivities();
        }} , (error) => {
          this.alertpopupService.open({
            message: error?.message ? error?.message : 'Failed to remove Activities  ',
            action: 'ok'
          })
        })
    }
  }
}
