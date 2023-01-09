import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationService } from 'src/app/organization/organization.service';
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
  Status=Status
  organizationList: any;
  filesListArray:any[]=[];
  description: string='';
  cardData:any[]=[{
    title:'prasad',
    description:'scscsvjsvhsvj'
  },{
    title:'prasad1',
    description:'scscsvjsvhsvj1'
  }
]
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
  


  constructor(
    private activatedRoute: ActivatedRoute,
    private activityService: ActivityService,
    private formBuilder:FormBuilder,
    private organizationService:OrganizationService,
    private router :Router,
    private userDetailsService :UserDetailsService
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
    
    })
  }


  getActivityMasterData(){
    this.activityService.getActivitiesMasterData().subscribe(res=>{
      
      this.activityEntryType=res.data?.activityEntryTypesData.filter((activityEntry:any)=>activityEntry._id==this.selectedActivityEntryTypeId).map((item:any)=>item.name)
      this.activityRelatedTypesData=res.data?.activityRelatedTypesData.filter((activityRelated:any)=>activityRelated._id==this.selectedActivityRelatedTypeId).map((item:any)=>item.name)
      this.activitySectorsData=res.data?.activitySectorsData.filter((sectorsData:any)=>sectorsData._id==this.selectedActivitySectorId).map((item:any)=>item.name)
      this.ActivityScopeData=res.data?.activityScopesData.filter((activityScopesData:any)=>activityScopesData._id==this.selectedActivityScopeId).map((item:any)=>item.name)
      this.ActivityScopeData=res.data?.activityScopesData.filter((activityScopesData:any)=>activityScopesData._id==this.selectedActivityScopeId).map((item:any)=>item.name)
    console.log(this.activitySectorsData)
    })
    }

  genarateActivityLogForm() {
    this.activityLogForm = this.formBuilder.group({
      priority: ['', [Validators.required]],
      visibility:['',[Validators.required]],
      status:['',[Validators.required]],
      AssignTo:['',[Validators.required]]
      
     
    })
  }
  
  onSubmit(){
    console.log(this.activityLogForm.value)

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
 

}
