import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrganizationService } from 'src/app/organization/organization.service';
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
  Visibility= Visibility
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
  


  constructor(
    private activatedRoute: ActivatedRoute,
    private activityService: ActivityService,
    private formBuilder:FormBuilder,
    private organizationService:OrganizationService
  ) {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.selectedActivityId = res['aId'];
      console.log(this.selectedActivityId)
    });
  }

  ngOnInit(): void {
    this.getAllOrganizationsBySearchCriteria()
    this.getActivityDetailsById()
    this.genarateActivityLogForm()
  }

  getActivityDetailsById(){
    this.activityService.getActivityById(this.selectedActivityId).subscribe(res=>{
      console.log(res)
      this.activityDetails=res.data[0]
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


}
