import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(private formBuilder: FormBuilder, 
    private masterDataService : MasterDataService, 
    private organizationService :OrganizationService,
    private alertpopupService : AlertpopupService) { }

  ngOnInit(): void {
    this.OrganizationFormValues()
    this.getOrganizationTypes();
  }

  getOrganizationTypes(){
    this.masterDataService.getOrganizationTypes().subscribe((res)=>{
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
    const payload :CreateOrganization = {
      ...this.createOrganizationForm.value,
      "isActive" : true
    }
    this.organizationService.createOrganization(payload).subscribe((res)=>{
      console.log(res);
      this.alertpopupService.open({
        message : res.message,
        action : 'ok'
      })
    },(error)=>{
      this.alertpopupService.open({
        message : "Faild to create Organization! Please try again ",
        action : 'ok'
      })
    })
  }

}
