import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from 'ngx-editor';
import { forkJoin } from 'rxjs';
import { OrganizationService } from 'src/app/organization/organization.service';
import { AlertpopupService } from 'src/app/shared/alertPopup/alertpopup.service';
import { RouteConstants } from 'src/app/shared/constants/routes.constants';
import { STORAGE_KEYS } from 'src/app/shared/enums/storage.enum';
import { StorageService } from 'src/app/shared/services/storage-service/storage.service';
import { UserDetailsService } from 'src/app/shared/services/user-details-service/user-details.service';
import { Priority, Status } from '../activity.constant';
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
  isMultipleOrganization: any
  activityTypesData: any;
  activityRelatedTypesData: any;
  activityEntryTypesData: any;
  activitySectorsData: any;
  activityScopesData: any;
  selectedOrganizationValue: any;
  removable: boolean = true
  selectedActivityId: any;
  selectedActivityData: any; 
  filesListArray: any[] = [];
  userOrganizations: any;
  userDetails: any;
  createdByOrganization: any;
  descriptionOfTextEditor: any;
  priority=Priority;
  status=Status;


  constructor(
    private organizationService: OrganizationService,
    private formBuilder: FormBuilder,
    private activityService: ActivityService,
    private alertpopupService: AlertpopupService,
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute,
    private userDetailsService: UserDetailsService,
    private router:Router

  ) {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.selectedActivityId = res['aId'];
      console.log(this.selectedActivityId)
    });
  }

  ngOnInit() {
    this.generateAddNewUserForm()
    this.getUserDetails()
    if (this.selectedActivityId) {
      this.forkJoinResult();
    } else {
      this.getAllOrganization();
      this.getActivityMasterData()
    }
  }

  forkJoinResult() {
    forkJoin([this.organizations$, this.activityMasterData$, this.activity$]).subscribe(result => {
      this.organizationsData = result[0]?.organizations;
      const selectedOrganizations = result[0]?.organizations.filter((org: any) => {
        return result[2].data[0]?.organizationData.find((o: any) => o._id === org._id)
      })

      this.activityTypesData = result[1]?.data.activityTypesData;
      this.activityRelatedTypesData = result[1]?.data?.activityRelatedTypesData;
      this.activityEntryTypesData = result[1]?.data?.activityEntryTypesData;
      this.activitySectorsData = result[1]?.data?.activitySectorsData;
      this.activityScopesData = result[1]?.data?.activityScopesData;
      this.selectedActivityData = result[2]?.data[0];
      this.activityForm.controls['activityType'].setValue(this.selectedActivityData?.activityType)
      this.activityForm.controls['activityRelatedTo'].setValue(this.selectedActivityData?.activityRelatedTo)
      this.activityForm.controls['organization']?.setValue(selectedOrganizations)
      this.activityForm.controls['activitEntryType'].setValue(this.selectedActivityData?.activitEntryType)
      this.activityForm.controls['activitySector'].setValue(this.selectedActivityData?.activitySector)
      this.activityForm.controls['activityScope'].setValue(this.selectedActivityData?.activityScope)
      this.activityForm.controls['title'].setValue(this.selectedActivityData?.title)
      this.activityForm.controls['attachments'].setValue(this.selectedActivityData?.attachments)

    })
  }

  get organizations$() {
    return this.organizationService.getAllOrganizations();
  }

  getAllOrganization() {
    this.organizations$.subscribe((res) => {
      this.organizationsData = res?.organizations;
      this.organizationList = res?.organizations
    })
  }

  get activityMasterData$() {
    return this.activityService.getActivitiesMasterData()
  }

  getActivityMasterData() {
    this.activityService.getActivitiesMasterData().subscribe(res => {
      this.activityTypesData = res?.data?.activityTypesData;
      this.activityRelatedTypesData = res?.data?.activityRelatedTypesData;
      this.activityEntryTypesData = res?.data?.activityEntryTypesData;
      this.activitySectorsData = res?.data?.activitySectorsData;
      this.activityScopesData = res?.data?.activityScopesData;
    })
  }

  generateAddNewUserForm() {
    this.activityForm = this.formBuilder.group({
      activityType: ['', Validators.required],
      activityRelatedTo: ['', Validators.required],
      organization: ['', Validators.required,],
      activitEntryType: ['', Validators.required],
      activitySector: ['', Validators.required],
      activityScope: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      attachments: ['', Validators.required],
      createdByOrganization: ['', Validators.required]
    })

  }

  get activity$() {
    return this.activityService.getActivityById(this.selectedActivityId);
  }


  onSubmit() {

    if (this.selectedActivityId) {
      const payload = { ...this.activityForm.value, 
        attachments: this.filesListArray, 
        organization: this.selectedOrganizationValue, 
        priority: Priority[0] , 
        status: Status[0], 
        createdBy: this.storageService.getDataFromLocalStorage(STORAGE_KEYS.USER_ID) 
      }
      this.activityService.updateActivity(this.selectedActivityId, payload).subscribe(res => {
        this.alertpopupService.open({
          message: res.message ? res.message : 'Activity updated Successfully',
          action: 'ok'
        })

      }, (error) => {
        this.alertpopupService.open({
          message: error.message ? error.message : "something went wrong!",
          action: "ok"

        });
      })
    } 
      else {
        this.selectedOrganizationValue = this.activityForm.get('organization')?.value.map((org: any) => org._id)
        const payload = { ...this.activityForm.value, 
          attachments: this.filesListArray, 
          organization: this.selectedOrganizationValue,
          priority: Priority[0], 
          status: Status[0], 
          description:this.descriptionOfTextEditor,
          createdBy: this.storageService.getDataFromLocalStorage(STORAGE_KEYS.USER_ID),
        }
        
        this.activityService.postActivity(payload).subscribe((res) => {
          this.alertpopupService.open({
            message: res.message ? res.message : 'Activity Created Successfully',
            action: 'ok'
          })
          this.router.navigate([RouteConstants.ACTIVITY])

        }, (error) => {
          this.alertpopupService.open({
            message: error.message ? error.message : "something went wrong!",
            action: "ok"

          });
        })
      }
    }
  

  //future use
  relatedValue(event: any) {
    event.value === "Multiple Ministries/Departments" ? this.isMultipleOrganization = false : true
  }

  removeChip(index: number) {

    let organizationValues = this.activityForm.controls['organization'];
    organizationValues.value.splice(index, 1);
    this.activityForm.controls['organization']?.setValue(organizationValues.value);

  }
  removeFileChip(index: number) {
    this.filesListArray.splice(index, 1)
  }
  getUserDetails() {
    this.userDetailsService.getUserDetails().subscribe((res) => {
      this.userDetails = res
      if(this.userDetails?.organization?.length === 1){
        this.activityForm?.controls['createdByOrganization']?.setValue(this.userDetails?.organization[0]);
      }
    })
  }

  updatedDescription(event :any){
  this.descriptionOfTextEditor=event

  }
  updatedFilesDescription(event:any){
    for (var i = 0; i < event.length; i++) {
      this.filesListArray.push({
        name: event[i].name,
        size: event[i].size.toString(),
        path: "string"
      });
    } 
  }

}
