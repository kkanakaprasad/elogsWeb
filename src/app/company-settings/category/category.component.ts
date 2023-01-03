import { Component, OnInit } from '@angular/core';
import { CompanySettingsService } from '../company-settings.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor( private companySettingsService: CompanySettingsService ) { }

  ngOnInit(): void {
  }

  newCategoryPopup() {
   
    this.companySettingsService.newCategoryPopup().afterClosed().subscribe((res) => {
      if(res) {
        
      }
  })
}
}
