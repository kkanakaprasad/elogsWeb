import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrganizationService } from 'src/app/organization/organization.service';
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
  Priority=['none','low','medium','high'];
  Visibility= ['internal','everyone']
  Status=['new','inProgress','notAdmissible','resolved']
  organizationList: any;
  filePath: any;
  fileName: any;
  fileSize: any;
  filesListArray:any[]=[];
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
    this.activityLogFormValues()
  }

  getActivityDetailsById(){
    this.activityService.getActivityById(this.selectedActivityId).subscribe(res=>{
      console.log(res)
      this.activityDetails=res.data[0]
    })
  }
  

  activityLogFormValues() {
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
      console.log(res.data.organizations)
    })
  }
  updatedDescription(event:string){
    console.log(event)
  }
  updatedFilesDescription(event:any){
    for (var i = 0; i < event.length; i++) {
      this.filePath = "string"
      this.fileName = event[i].name
      this.fileSize = event[i].size
      this.filesListArray.push({
        name: this.fileName,
        size: this.fileSize,
        path: this.filePath
      });
    } 
  }


}
