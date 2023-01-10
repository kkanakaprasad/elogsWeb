import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationService } from 'src/app/organization/organization.service';
import { AlertpopupService } from 'src/app/shared/alertPopup/alertpopup.service';
import { RouteConstants } from 'src/app/shared/constants/routes.constants';
import { UserDetailsService } from 'src/app/shared/services/user-details-service/user-details.service';
import { Priority, Status, Visibility } from '../activity.constant';
import { ActivityService } from '../activity.service';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.scss']
})
export class ActivityDetailsComponent implements OnInit {
  selectedActivityId: any;
  activityDetails: any;
  activityLogForm!: FormGroup;
  Priority=Priority;
  visibility= Visibility
  status=Status
  organizationList: any;
  filesListArray:any[]=[];
  description: string='';
  
selectedActivityEntryTypeId: any;
  activityEntryType: any;
  activityRelatedTypesData: any;
  selectedActivityRelatedTypeId: any;
  selectedActivityTypesDataId: any;
  activityTypesData: any;
  selectedPriorityId: any;
  activityPriority: any;
  activityData: any;
  activitySectorsData: any;
  selectedActivitySectorId: any;
  selectedActivityScopeId: any;
  ActivityScopeData: any;
  selectedActivityCreatedById: any;
  organizationCreatedBy: any;
  activityLogData: any;
  selectedDate:any;
  toDay=new Date();
  isArchive: any;
  


  constructor(
    private activatedRoute: ActivatedRoute,
    private activityService: ActivityService,
    private formBuilder:FormBuilder,
    private organizationService:OrganizationService,
    private router :Router,
    private alertpopupService :AlertpopupService
  ) {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.selectedActivityId = res['aId'];
      console.log(this.selectedActivityId)
    });
  }

  ngOnInit(): void {
    this.getActivityDetailsById()
    this.getActivityMasterData()
    this.getAllOrganizationsBySearchCriteria()
    this.genarateActivityLogForm()
    
  }

  getActivityDetailsById(){
    this.activityService.getActivityById(this.selectedActivityId).subscribe(res=>{
      this.activityData=res.data[0]
      this.selectedActivityEntryTypeId=res.data[0].activitEntryType
      this.selectedActivityRelatedTypeId=res.data[0].activityRelatedTo
      this.selectedActivitySectorId=res.data[0].activitySector
      this.selectedActivityScopeId=res.data[0].activityScope
      this.selectedActivityCreatedById=res.data[0].createdBy
      // console.log(this.activityData.organizationData[0].organization)
      console.log(res)
      this.organizationCreatedBy=this.activityData.organizationData[0].organization
      this.activityLogData=this.activityData.activityLog
      this.isArchive=this.activityData.isArchive
      
    })
  }


  getActivityMasterData(){
    this.activityService.getActivitiesMasterData().subscribe(res=>{
      this.activityEntryType=res.data?.activityEntryTypesData.filter((activityEntry:any)=>activityEntry._id==this.selectedActivityEntryTypeId).map((item:any)=>item.name)
      this.activityRelatedTypesData=res.data?.activityRelatedTypesData.filter((activityRelated:any)=>activityRelated._id==this.selectedActivityRelatedTypeId).map((item:any)=>item.name)
      this.activitySectorsData=res.data?.activitySectorsData.filter((sectorsData:any)=>sectorsData._id==this.selectedActivitySectorId).map((item:any)=>item.name)
      this.ActivityScopeData=res.data?.activityScopesData.filter((activityScopesData:any)=>activityScopesData._id==this.selectedActivityScopeId).map((item:any)=>item.name)
      this.ActivityScopeData=res.data?.activityScopesData.filter((activityScopesData:any)=>activityScopesData._id==this.selectedActivityScopeId).map((item:any)=>item.name)
    })
    }

  genarateActivityLogForm() {
    this.activityLogForm = this.formBuilder.group({
      priority: ['', [Validators.required]],
      visibility:['',[Validators.required]],
      status:['',[Validators.required]],
      assignTo:['',[Validators.required]],
      attachments:['',[Validators.required]],
      message:['',[Validators.required]],
     
    })
  }
  
  onSubmit(){
    console.log({...this.activityLogForm.value,attachments:this.filesListArray,message:this.description})
    const payload={...this.activityLogForm.value,attachments:this.filesListArray,message:this.description}
    this.activityService.updateActivityLogById(this.selectedActivityId,payload).subscribe(res=>{
      this.alertpopupService.open({
        message: res.message ? res.message : 'Activity Updated Successfully',
        action: 'ok'
      })

    }, (error) => {
      this.alertpopupService.open({
        message: error.message ? error.message : "something went wrong!",
        action: "ok"

      });
    })
  }
  
  getAllOrganizationsBySearchCriteria(){
    const payload = {
      pageNumber: 0,
      pageSize: 50,
      sortField: "",
      sortOrder: 0,
      type: "63973bfb61ab6f49bfdd3c35",
      organization: "",
      organizationId: "",
      isActive: true,
      userId: "",
      userSearch: ""
    }
    this.organizationService.getOrganizationsSearchCriteria(payload).subscribe((res) => {
      this.organizationList=res.data.organizations 
     
    })
  }
  updatedDescription(event:string){
    this.description=event
  }
  updatedFilesDescription(event:any){
    for (var i = 0; i < event.length; i++) {
      this.filesListArray.push({
        name: event[i].name,
        size: event[i].size,
        path: "string"
      });
    } 
  }
  updateActivityDetails(){
      this.router.navigate( [RouteConstants.CREATEACTIVITY], { queryParams: { aId: this.selectedActivityId}});
    }
 
    // updateActivityLogById(){
      
    // }
    dueDateSetter(selectedOption:any,selectedOptionalDate?:any){

      if(selectedOption=='noDueDate'){
        this.selectedDate=""
        
      }else if(selectedOption=='Today'){
        this.selectedDate=new Date()
        
      }else if(selectedOption=='Tomorrow'){
        this.selectedDate=new Date(this.toDay.setDate(this.toDay.getDate()+1))
        
      }else if(selectedOption=='Next Monday'){
        this.selectedDate=new Date(this.toDay.setDate(this.toDay.getDate() + (7-this.toDay.getDay())%7+1))
        
      }else if(selectedOption=='This Friday'){
        this.selectedDate=new Date(this.toDay.setDate(this.toDay.getDate() + (12-this.toDay.getDay())%7))
        
      }else if(selectedOption=='custom'){
        this.selectedDate=selectedOptionalDate.value
        
      }
    }

}
