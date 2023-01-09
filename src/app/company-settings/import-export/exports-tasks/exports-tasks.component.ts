import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanySettingsService } from '../../company-settings.service';

@Component({
  selector: 'app-exports-tasks',
  templateUrl: './exports-tasks.component.html',
  styleUrls: ['./exports-tasks.component.scss']
})
export class ExportsTasksComponent implements OnInit {

  exportTasksForm!: FormGroup;
  organizationsList: any
  activityTypes: any

  constructor(private formBuilder: FormBuilder,
    public dialogref: MatDialogRef<ExportsTasksComponent>,
    @Inject(MAT_DIALOG_DATA) public selectedCategory: any,
    private companySettingsService: CompanySettingsService,
  ) { }

  ngOnInit(): void {
    this.getAllOrganizations()
    this.getAllActivityTypes()
    this.exportTasksToCSVForm()
  }

  exportTasksToCSVForm() {

    this.exportTasksForm = this.formBuilder.group({
      project: ["", Validators.required],
      date: ["", Validators.required],
      status: ["", Validators.required],
      types: ["", Validators.required],
      shortName: ["", Validators.required],
      priority: ["", Validators.required],
      members: ["", Validators.required],
      assignTo: ["", Validators.required],

    })
  }

  getAllOrganizations() {
    this.companySettingsService.getAllOrganizations().subscribe((res) => {
      this.organizationsList = res.organizations
      console.log(this.organizationsList)
    })
  }

  getAllActivityTypes() {
    this.companySettingsService.getAllActivityTypes().subscribe((res) => {
      this.activityTypes = res.data

    })
  }

}
