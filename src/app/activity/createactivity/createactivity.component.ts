import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { OrganizationService } from 'src/app/organization/organization.service';
import { AlertpopupService } from 'src/app/shared/alertPopup/alertpopup.service';
import { STORAGE_KEYS } from 'src/app/shared/enums/storage.enum';
import { StorageService } from 'src/app/shared/services/storage-service/storage.service';
import { ActivityService } from '../activity.service';



@Component({
  selector: 'app-createactivity',
  templateUrl: './createactivity.component.html',
  styleUrls: ['./createactivity.component.css']
})
export class CreateactivityComponent implements OnInit {
  organizationsData: any;
  allOrganization: any;
  organizationList: any;
  activityForm!: FormGroup;
  isMultipleOrganization:any
  activityTypesData: any;
  activityRelatedTypesData: any;
  activityEntryTypesData: any;
  activitySectorsData: any;
  activityScopesData: any;
  organizationFormControlValue: any;

  constructor(
    private organizationService: OrganizationService,
    private formBuilder: FormBuilder,
    private activityService:ActivityService,
    private alertpopupService:AlertpopupService,
    private storageService: StorageService
    
  ) { }

  ngOnInit() {
    this.getActivityMasterData()
    this.getAllOrganization();
    this.generateAddNewUserForm()
    
  }
  getAllOrganization() {
    this.organizationService.getAllOrganizations().subscribe((res) => {
      console.log(res)
      this.organizationsData = res.organizations;
      this.allOrganization = this.organizationsData.filter((x: any) => x.type == "63973bfb61ab6f49bfdd3c35")
      console.log(this.allOrganization)
      this.organizationList = res.organizations
    })
    

  }

  getActivityMasterData(){
    this.activityService.getActivitiesMasterData().subscribe(res=>{
      console.log(res.data)
      this.activityTypesData=res.data.activityTypesData;
      this.activityRelatedTypesData=res.data.activityRelatedTypesData;
      this.activityEntryTypesData=res.data.activityEntryTypesData;
      this.activitySectorsData=res.data.activitySectorsData;
      this.activityScopesData=res.data.activityScopesData;
    })
  }

  generateAddNewUserForm() {
    this.activityForm = this.formBuilder.group({
      activityType: ['', Validators.required],
      activityRelatedTo: ['', Validators.required],
      organization: ['', Validators.required,],
      activitEntryType: ['',Validators.required],
      activitySector: ['', Validators.required],
      activityScope: ['', Validators.required],
      title: ['', Validators.required],
      description: ['string', Validators.required],
      attachments: ['string', Validators.required],
    })

  }
  
  onSubmit() {
    this.organizationFormControlValue=this.activityForm.get('organization')?.value.map((org:any)=>org._id)
    const payload={...this.activityForm.value, organization:this.organizationFormControlValue, priority: "none ",status: "string",createdBy:this.storageService.getDataFromLocalStorage(STORAGE_KEYS.USER_ID)}
    console.log(payload);
    this.activityService.postActivity(payload).subscribe((res)=>{
      this.alertpopupService.open({
        message: res.message ? res.message : 'Activity Created Successfully',
        action: 'ok'
      })

    },(error) => {
      this.alertpopupService.open({
        message: error.message ? error.message : "something went wrong!",
        action: "ok"

      });
    })
  }

  //future use
  relatedValue(event:any){
    console.log(event.value)
    event.value==="Multiple Ministries/Departments"?this.isMultipleOrganization=false:true
    console.log(this.isMultipleOrganization)
  }
  

}
