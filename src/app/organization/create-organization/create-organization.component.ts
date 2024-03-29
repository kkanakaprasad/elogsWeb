import { UpperCasePipe } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertpopupService } from 'src/app/shared/alertPopup/alertpopup.service';
import { EventCommunicationsService } from 'src/app/shared/services/event-communications.service';
import { MasterDataService } from 'src/app/shared/services/master-data/master-data.service';
import { UserDetailsService } from 'src/app/shared/services/user-details-service/user-details.service';
import { CreateOrganization, OrganizationSearchCriteria } from '../organization.interface';
import { OrganizationService } from '../organization.service';

@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.scss']
})
export class CreateOrganizationComponent implements OnInit {

  createOrganizationForm!: FormGroup;
  organizationTypes: any;
  oraginsationData: any;
  isSelected: boolean = false;
  organizationUsersData: any;

  constructor(private formBuilder: FormBuilder,
    private masterDataService: MasterDataService,
    private organizationService: OrganizationService,
    private alertpopupService: AlertpopupService,
    private eventCommunicationsService:EventCommunicationsService,
    public dialogref: MatDialogRef<CreateOrganizationComponent>,
    @Inject(MAT_DIALOG_DATA) public dataId: CreateOrganizationComponent
  ) {

  }

  ngOnInit(): void {
    this.OrganizationFormValues()
    this.getOrganizationTypes();
    this.getOrganizationsData();
  }

  getOrganizationsData() {
    if (this.dataId) {
      this.organizationService.getorganizationById(this.dataId).subscribe((res) => {
        this.isSelected = true
        this.oraginsationData = res.organization
        this.createOrganizationForm.controls['type'].setValue(this.oraginsationData?.type);
        this.createOrganizationForm.controls['organization'].setValue(this.oraginsationData?.organization);
        this.createOrganizationForm.controls['shortName'].setValue(this.oraginsationData?.shortName);
        this.createOrganizationForm.controls['defaultAssign'].setValue('');
      })
    }
  }

  getOrganizationTypes() {
    this.masterDataService.getOrganizationTypes().subscribe((res) => {
      this.organizationTypes = res.data
    })
  }

  OrganizationFormValues() {
    this.createOrganizationForm = this.formBuilder.group({
      type: ['', Validators.nullValidator],
      organization: ['', [Validators.required,Validators.maxLength(126)]],
      shortName: ['', [Validators.required,Validators.maxLength(5)]],
      defaultAssign: ['', Validators.nullValidator],
    })
  }

  onSubmit() {
    const payload: CreateOrganization = {
      ...this.createOrganizationForm.value,
      "isActive": true
    }
    if (this.dataId) {
      this.organizationService.updateOrganization(this.dataId, {...payload,type : this.oraginsationData?.type}).subscribe((res) => {
        this.eventCommunicationsService.broadcast('NEW_ORGANIZATION_CREATED',true);
        this.alertpopupService.open({
          message: res.message? res.message : 'Organization updated successfully',
          action: 'ok'
        })
      }, (error) => {
        this.alertpopupService.open({
          message: "Faild to update Organization! Please try again ",
          action: 'ok'
        })
      })
    } else {
      this.organizationService.createOrganization(payload).subscribe((res) => {
        this.eventCommunicationsService.broadcast('NEW_ORGANIZATION_CREATED',true);
        this.alertpopupService.open({
          message: res.message? res.message : 'Organization created successfully',
          action: 'ok'
        })
      }, (error) => {
        this.alertpopupService.open({
          message: "Faild to create Organization! Please try again ",
          action: 'ok'
        })
      })
    }
  }

 

}
