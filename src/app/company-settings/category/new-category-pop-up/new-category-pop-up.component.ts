import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanySettingsService } from '../../company-settings.service';


@Component({
  selector: 'app-new-category-pop-up',
  templateUrl: './new-category-pop-up.component.html',
  styleUrls: ['./new-category-pop-up.component.scss']
})
export class NewCategoryPopUpComponent implements OnInit {

  newCategoryForm!: FormGroup;
  public activityTypes: any
  

  constructor(private formBuilder: FormBuilder,public dialogref: MatDialogRef<NewCategoryPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public dataId: NewCategoryPopUpComponent, private companySettingsService: CompanySettingsService) { }

    NewCategoryFormValues() {
      this.newCategoryForm = this.formBuilder.group({
       
        name: ['', Validators.required],
        shortName: ['', Validators.required],
        
      })
    }

  ngOnInit(): void {
    this.updateActivityTypes ()
    this.NewCategoryFormValues()
  }

  updateActivityTypes () {
    this.companySettingsService.getAllActivityTypes().subscribe((res) => {
    this.activityTypes = res.data[0]
    this.newCategoryForm.controls['name'].setValue(this.activityTypes.name);
    this.newCategoryForm.controls['shortName'].setValue(this.activityTypes.shortName);
  
    })
  }
}
