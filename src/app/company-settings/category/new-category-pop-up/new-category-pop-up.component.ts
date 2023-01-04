import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertpopupService } from 'src/app/shared/alertPopup/alertpopup.service';
import { CreateActivityType, UpdateActivityType } from '../category.interface';
import { CompanySettingsService } from '../../company-settings.service';


@Component({
  selector: 'app-new-category-pop-up',
  templateUrl: './new-category-pop-up.component.html',
  styleUrls: ['./new-category-pop-up.component.scss']
})
export class NewCategoryPopUpComponent implements OnInit {

  newCategoryForm!: FormGroup;
  public activityTypes: any;
  isSelected: boolean = false;


  constructor(private formBuilder: FormBuilder,
    public dialogref: MatDialogRef<NewCategoryPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public selectedCategory: any,
    private companySettingsService: CompanySettingsService,
    private alertpopupService: AlertpopupService,) { }

  ngOnInit(): void {
    this.genrateCategoryForm()
  }

  /**
   * To genarate category form
   */
  genrateCategoryForm() {
    this.newCategoryForm = this.formBuilder.group({
      name: [this.selectedCategory.name ? this.selectedCategory.name : "", Validators.required],
      shortName: [this.selectedCategory.shortName ? this.selectedCategory.shortName : "", Validators.required],

    })
  }

  /**
   * 
   */
  onSubmit() {
   

    if (this.selectedCategory._id) {
      const payload: UpdateActivityType = {
        ...this.newCategoryForm.value,
        "isActive": true,
        "isDefault": false
      }

      this.companySettingsService.updateActivtyType(this.selectedCategory._id, payload).subscribe((res) => {
        this.alertpopupService.open({
          message: res.message,
          action: 'ok'
        })
      }, (error : any) => {
        this.alertpopupService.open({
          message: error.message ? error.message : "Faild to update Category! Please try again ",
          action: 'ok'
        })
      })
    }else{
      const payload: CreateActivityType = {
        ...this.newCategoryForm.value,
        "isActive": true,
        "isDefault": false
      }
      this.companySettingsService.createActivtyType(payload).subscribe((res) => {
        this.alertpopupService.open({
          message: res.message,
          action: 'ok'
        })
      }, (error : any) => {
        this.alertpopupService.open({
          message: error.message ? error.message : "Faild to create Category! Please try again ",
          action: 'ok'
        })
      })

    }
  }
}
