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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userRole:any;
  selectedDate: any;
  activityTypesData: any;
  selectedActivityId: any;
  selectedStartDate: any;
  selectedEndDate: any;
  dashboardMetricsCount: any;
  dueDateDashBoarData: any;

  constructor(private matDialog: MatDialog,
    private organizationService:OrganizationService,
    private storageService: StorageService,
    private confirmationDialogService :ConfirmationDialogService,
    private router : Router,
    private addNewUserService :AddNewUserService,
    private activityService :ActivityService,
    ) { }

  ngOnInit(): void {
    this.userRole = this.storageService.getDataFromLocalStorage(STORAGE_KEYS.ROLE);
    this.getActivityMasterData()
    this.activityService.postDashBoardActivityMetrics({}).subscribe(res => {
      this.dashboardMetricsCount=res[0]
        })
    this.getDashBoardDueDateMetrics()
  }
  openDialog() {
    this.organizationService.openCreateOrganizatioPopup()
  }
  openAddUser() {
    this.addNewUserService.openAddUser()
  }

  createOrganization(){
    this.organizationService.openCreateOrganizatioPopup();
  }

  logout(){
    this.confirmationDialogService.open({
      message: 'Are you Sure to Logout!!'
    }).afterClosed().subscribe((res)=>{
      if(res){
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
    const payload={
      dateRange: {
        fromDate:this.selectedStartDate ,
        toDate: this.selectedEndDate
      },
      type:this.selectedActivityId
    }
    this.activityService.postDashBoardActivityMetrics(payload).subscribe(res => {
      this.dashboardMetricsCount=res[0]
  console.log(res[0])
    })
  }
  startDateSetter( selectedOptionalDate?: any) { 
      this.selectedStartDate = selectedOptionalDate.value
    console.log(this.selectedStartDate)
    this.postDashBoardActivityMetrics()
    
  }
  endDateSetter(selectedOptionalDate?: any) {
      this.selectedEndDate = selectedOptionalDate.value
      console.log(this.selectedEndDate)
      this.postDashBoardActivityMetrics()
   
  }
  selectedActivityType(event:any){
    console.log(event.value)
    this.selectedActivityId=event.value
    this.postDashBoardActivityMetrics()
  }

  getDashBoardDueDateMetrics(){
    this.activityService.getDashBoardDueDateMetrics().subscribe(res=>{
      console.log(res)
      this.dueDateDashBoarData=res[0]
    })
  }
  

}
