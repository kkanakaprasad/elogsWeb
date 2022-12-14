import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.scss']
})
export class CreateOrganizationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }
  createOrganizationForm!: FormGroup;
  organizationType:any=['Department','Association']
  OrganizationFormValues() {
    this.createOrganizationForm = this.formBuilder.group({
      organizationType: ['', Validators.required],
      organizationName: ['', Validators.required],
      shortName: ['', Validators.required],
    })
  }
  
  ngOnInit(): void {
    this.OrganizationFormValues()
  }
  
  onSubmit() {
    console.log(this.createOrganizationForm.value)
  }

}
