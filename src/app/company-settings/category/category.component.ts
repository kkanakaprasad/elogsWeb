import { Component, OnInit } from '@angular/core';
import { CompanySettingsService } from '../company-settings.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public activityTypes: any

  constructor(private companySettingsService: CompanySettingsService) { }

  ngOnInit(): void {
    this.getAllActivityTypes()
  }

  updateCategoryPopup(activityTypeData: any) {

    this.companySettingsService.updateCategoryPopup(activityTypeData).afterClosed().subscribe((res) => {
      if (res) {
        this.getAllActivityTypes()
      }
    })
  }
  createCategoryPopup() {

    this.companySettingsService.createCategoryPopup().afterClosed().subscribe((res) => {
      if (res) {
        this.getAllActivityTypes()
      }
    })
  }
  getAllActivityTypes() {
    this.companySettingsService.getAllActivityTypes().subscribe((res) => {
      this.activityTypes = res.data

    })
  }
}
