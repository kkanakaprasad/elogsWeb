import { Component, OnInit } from '@angular/core';
import { CompanySettingsService } from '../company-settings.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public activityTypes: any

  constructor( private companySettingsService: CompanySettingsService ) { }

  ngOnInit(): void {
    this.getAllActivityTypes ()
  }

  newCategoryPopup() {
   
    this.companySettingsService.newCategoryPopup().afterClosed().subscribe((res) => {
      if(res) {
        
      }
  })
}
getAllActivityTypes () {
  this.companySettingsService.getAllActivityTypes().subscribe((res) => {
  this.activityTypes = res.data
  console.log(this.activityTypes);

  })
}
}
