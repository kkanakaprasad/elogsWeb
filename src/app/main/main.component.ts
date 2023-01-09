import { Component, OnInit } from '@angular/core';
import { CompanySettingsService } from '../company-settings/company-settings.service';
import { SearchPipe } from '../shared/pipes/search.pipe';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  organizationsList = [] as any;
  searchedOrganizationList : any = [];

  constructor(private companySettingsService: CompanySettingsService) { }

  ngOnInit(): void {
    this.getAllOrganizations()
  }

  getAllOrganizations() {
    this.companySettingsService.getAllOrganizations().subscribe((res) => {
      this.organizationsList = res.organizations
      this.searchedOrganizationList = res.organizations
      console.log(this.organizationsList)
    })
  }

  // filterOrganization(event:any) {
  //   const searchText = event.target.value;

  //   this.organizationsList = this.organizationsList.map((org: any) => {
  //     return new SearchPipe().transform( org, searchText, org.organization)
  //     //return org.organization.toLowerCase().indexOf(searchText.toLowerCase()) > -1
  //   });
  // }
  filterOrganization(event:any){
    if(event.target.value){
      const search = new SearchPipe();
      this.searchedOrganizationList = search.transform(this.organizationsList,event.target.value,'organization');
    }else{
      this.organizationsList;
    }
    
    }
    

  

}
