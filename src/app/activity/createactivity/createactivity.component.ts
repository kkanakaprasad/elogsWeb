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
  styleUrls: ['./createactivity.component.scss'],
})
export class CreateactivityComponent implements OnInit {
  organizationsData: any;
  allOrganization: any;
  organizationList: any;
  activityForm!: FormGroup;
  isMultipleOrganization: any;
  activityTypesData: any;
  activityRelatedTypesData: any;
  activityEntryTypesData: any;
  activitySectorsData: any;
  activityScopesData: any;
  selectedOrganizationValue: any;
  removable: boolean = true;
  selectedActivityId: any;
  selectedActivityData: any;
  filesListArray: any[] = [];
  userOrganizations: any;
  userDetails: any;
  descriptionOfTextEditor: any;
  priority = Priority;
  status = Status;
  description: any;
  discriptionData: any;
  fileAttachmments: any;
  relatedTo:boolean = false;
  MinistryData:any

  constructor(
    private organizationService: OrganizationService,
    private formBuilder: FormBuilder,
    private activityService: ActivityService,
    private alertpopupService: AlertpopupService,
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute,
    private userDetailsService: UserDetailsService,
    private router: Router
  ) {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.selectedActivityId = res['aId'];
    });
  }

  ngOnInit() {
    this.generateAddNewUserForm();
    this.getUserDetails();
    if (this.selectedActivityId) {
      this.forkJoinResult();
    } else {
      this.getAllOrganization();
      this.getActivityMasterData();
    }
    // this.activatedRoute.queryParams.subscribe((res) => {
    //   this.selectedActivityId = res['eId'];
    // });
  }

  forkJoinResult() {
    forkJoin([
      this.organizations$,
      this.activityMasterData$,
      this.activity$,
    ]).subscribe((result) => {
      this.organizationsData = result[0]?.organizations;
      const selectedOrganizations = result[0]?.organizations.filter(
        (org: any) => {
          return result[2].data[0]?.organizationData.find(
            (o: any) => o._id === org._id
          );
        }
      );

      this.activityTypesData = result[1]?.data.activityTypesData;
      this.activityRelatedTypesData = result[1]?.data?.activityRelatedTypesData;
      this.activityEntryTypesData = result[1]?.data?.activityEntryTypesData;
      this.activitySectorsData = result[1]?.data?.activitySectorsData;
      this.activityScopesData = result[1]?.data?.activityScopesData;
      this.selectedActivityData = result[2]?.data[0];
      this.activityForm.controls['activityType'].setValue(
        this.selectedActivityData?.activityType
      );
      this.activityForm.controls['activityRelatedTo'].setValue(
        this.selectedActivityData?.activityRelatedTo
      );
      this.activityForm.controls['organization']?.setValue(
        selectedOrganizations
      );
      this.activityForm.controls['activitEntryType'].setValue(
        this.selectedActivityData?.activitEntryType
      );
      this.activityForm.controls['activitySector'].setValue(
        this.selectedActivityData?.activitySector
      );
      this.activityForm.controls['activityScope'].setValue(
        this.selectedActivityData?.activityScope
      );
      this.activityForm.controls['title'].setValue(
        this.selectedActivityData?.title
      );
      this.activityForm.controls['createdByOrganization'].setValue(
        this.selectedActivityData?.createdByOrganization
      );
      this.description = this.selectedActivityData.description;
    });
  }

  get organizations$() {
    return this.organizationService.getAllOrganizations();
  }

  getAllOrganization() {
    this.organizations$.subscribe((res) => {
      this.organizationsData = res?.organizations.filter(
        (org: any) => org.isActive === true
      );
      this.organizationList = res?.organizations.filter(
        (org: any) => org.isActive === true
      );
    });
  }

  get activityMasterData$() {
    return this.activityService.getActivitiesMasterData();
  }

  getActivityMasterData() {
    this.activityService.getActivitiesMasterData().subscribe((res) => {
      this.activityTypesData = res?.data?.activityTypesData;
      this.activityRelatedTypesData = res?.data?.activityRelatedTypesData;
      this.activityEntryTypesData = res?.data?.activityEntryTypesData;
      this.activitySectorsData = res?.data?.activitySectorsData;
      this.activityScopesData = res?.data?.activityScopesData;
    });
  }

  generateAddNewUserForm() {
    this.activityForm = this.formBuilder.group({
      activityType: ['', Validators.required],
      activityRelatedTo: ['', Validators.required],
      organization: ['',],
      activitEntryType: ['', Validators.required],
      activitySector: ['', Validators.required],
      activityScope: ['', Validators.required],
      title: ['', Validators.required],
      createdByOrganization: ['', Validators.required],
    });
  }

  onChange(event:any){
    this.activityForm.controls['organization'].setValue([event.value])
  }
  get activity$() {
    return this.activityService.getActivityById(this.selectedActivityId);
  }

  onChangerelatedTo(selectedOption : any) {
    this.activityForm.controls['organization'].setValue([]);
   if(selectedOption.name === 'Single Ministry/Department'){
    this.relatedTo = false
   }else{
    this.relatedTo = true
    
   }
  }

  onSubmit() {
    if (this.filesListArray?.length > 0) {
      const organization = this.userDetails?.organizationsdata.filter((org: any) => org._id === this.activityForm.controls['createdByOrganization'].value);
      this.filesListArray.map((file: any) => {
        file['organization'] = organization[0]?.organization
        file['organizationId'] = organization[0]?._id

      });
    }
    if (this.activityForm.get('organization')?.value!=null){
    this.selectedOrganizationValue = this.activityForm.get('organization')?.value.map((org: any) => org._id)
  }
   if (this.selectedActivityId) {
      const payload = {
        ...this.activityForm.value,
        attachments: [...this.filesListArray, ...this.selectedActivityData.attachments],
        organization: this.selectedOrganizationValue,
        description: this.descriptionOfTextEditor
      }
      this.activityService.updateActivity(this.selectedActivityId, payload).subscribe(res => {
        if (this.fileAttachmments?.length !== 0) {
          let formData = new FormData()
          for (let fileIndex = 0; fileIndex < this.fileAttachmments?.length; fileIndex++) {
            formData.append(res?.data[0]?._id, this.fileAttachmments[fileIndex], this.filesListArray[fileIndex]?.name)
          }
          this.uploadAttachments(formData);
        }
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
      const payload = {
        ...this.activityForm.value,
        attachments: this.filesListArray,
        organization: this.selectedOrganizationValue,
        priority: Priority[0],
        status: Status[0],
        description: this.descriptionOfTextEditor,
        visibility: 'INTERNAL'
      }

      this.activityService.postActivity(payload).subscribe((res) => {
        if (this.fileAttachmments?.length > 0) {
          let formData = new FormData()
          for (let fileIndex = 0; fileIndex < this.fileAttachmments?.length; fileIndex++) {
            formData.append(res.newActivity._id, this.fileAttachmments[fileIndex], this.filesListArray[fileIndex].name)
          }
          this.uploadAttachments(formData);
        }
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
    event.value === 'Multiple Ministries/Departments'
      ? (this.isMultipleOrganization = false)
      : true;
  }

  removeChip(index: number) {
    let organizationValues = this.activityForm.controls['organization'];
    organizationValues.value.splice(index, 1);
    this.activityForm.controls['organization']?.setValue(
      organizationValues.value
    );
  }
  removeFileChip(index: number) {
    this.filesListArray.splice(index, 1);
  }
  getUserDetails() {
    this.userDetailsService.getUserDetails().subscribe((res) => {
      this.userDetails = res;
      let organizationsData  = res.organizationsdata ? res.organizationsdata : [];
      if(organizationsData && organizationsData?.length === 1){
        this.getAllOrganizationsBySearchCriteria(organizationsData[0]?.type);
      }
      if (this.userDetails.organizationsdata) {
        this.userDetails.organizationsdata = [
          ...this.userDetails?.organizationsdata?.filter(
            (org: any) => org.isActive === true
          ),
        ];
      }
      if (this.userDetails?.organizationsdata?.length === 1) {
        setTimeout(() => {
          this.activityForm.patchValue({
            createdByOrganization: this.userDetails?.organizationsdata[0]._id,
          });
          this.activityForm.controls['createdByOrganization'].setErrors(null);
        });
      }
    });
  }

  updatedDescription(event: any) {
    this.descriptionOfTextEditor = event;
    this.discriptionData = event?.replace(/<[^>]*>/g, '');
  }

  updatedFilesDescription(event: any) {
    let files = event.target.files;
    this.fileAttachmments = files;
    for (var i = 0; i < files.length; i++) {
      this.filesListArray.push({
        name: files[i].name,
        size: files[i].size.toString(),
        path: 'string',
        type: files[i].type,
      });
    }
  }

  uploadAttachments(formData: FormData) {
    this.activityService
      .uploadAttachments(formData)
      .subscribe((res: any) => {});
  }

  gotoDashboard() {
    this.router.navigate([RouteConstants.DASHBOARD]);
  }

  isActivityFormActive(): boolean {
    if (this.activityForm.invalid || !this.discriptionData) {
      return true;
    } else {
      return false;
    }
  }

  getAllOrganizationsBySearchCriteria(type:string ='') {
		const payload = {
			pageNumber: 0,
			pageSize: 50,
			sortField: "",
			sortOrder: 0,
			type:type,
			organization: "",
			organizationId: "",
			isActive: true,
			userId: "",
			userSearch: ""
		}
		this.organizationService.getOrganizationsSearchCriteria(payload).subscribe((res) => {
			this.MinistryData=res.data.organizations
		})
	}

  organizationType(selectedOrg:any){
    this.getAllOrganizationsBySearchCriteria(selectedOrg.type);
  }

}

