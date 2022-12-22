import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertpopupService } from 'src/app/shared/alertPopup/alertpopup.service';
import { MasterDataService } from 'src/app/shared/services/master-data/master-data.service';
import { CreateOrganization } from '../organization.interface';
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
  isSelected: boolean=false;

  constructor(private formBuilder: FormBuilder,
    private masterDataService: MasterDataService,
    private organizationService: OrganizationService,
    private alertpopupService: AlertpopupService,
    public dialogref: MatDialogRef<CreateOrganizationComponent>,
    @Inject(MAT_DIALOG_DATA) public dataId: CreateOrganizationComponent
  ) {

  }

  ngOnInit(): void {
    this.OrganizationFormValues()
    this.getOrganizationTypes();
    this.getOrganizationsData()
  }
  getOrganizationsData() {
    this.organizationService.getorganizationById(this.dataId).subscribe((res) => {
      this.isSelected=true
      this.oraginsationData = res.organization
      console.log(this.oraginsationData)
      this.createOrganizationForm.controls['type'].setValue(this.oraginsationData.type);
      this.createOrganizationForm.controls['organization'].setValue(res.organization.organization);
      this.createOrganizationForm.controls['shortName'].setValue(res.organization.shortName)
    
    })
  }


  getOrganizationTypes() {
    this.masterDataService.getOrganizationTypes().subscribe((res) => {
      this.organizationTypes = res.data
    })

  }
  


  OrganizationFormValues() {
    this.createOrganizationForm = this.formBuilder.group({
      type: ['', Validators.required],
      organization: ['', Validators.required],
      shortName: ['', Validators.required],
    })
  }

  onSubmit() {
    
  
    const payload: CreateOrganization = {
      ...this.createOrganizationForm.value,
      "isActive": true
    }
    if(this.dataId){
      this.organizationService.updateOrganization(this.dataId,payload).subscribe((res) => {
        console.log(res);
        this.alertpopupService.open({
          message: res.message,
          action: 'ok'
        })
      }, (error) => {
        this.alertpopupService.open({
          message: "Faild to create Organization! Please try again ",
          action: 'ok'
        })
      })
    }else{
    this.organizationService.createOrganization(payload).subscribe((res) => {
      this.alertpopupService.open({
        message: res.message,
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
