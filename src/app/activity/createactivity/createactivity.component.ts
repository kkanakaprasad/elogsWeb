import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { OrganizationService } from 'src/app/organization/organization.service';


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

  constructor(
    private organizationService: OrganizationService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
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
    // console.log(activityForm.value | JSON)

  }


  generateAddNewUserForm() {
    this.activityForm = this.formBuilder.group({
      type: ['', Validators.required],
      relatedTo: ['', Validators.required],
      Ministry: ['', Validators.required,],
      etype: ['',Validators.required],
      Sector: ['', Validators.required],
      Scope: ['', Validators.required],
      Title: ['', Validators.required],
    })

  }
  onSubmit() {

    console.log(this.activityForm.value)
  }

  

}
