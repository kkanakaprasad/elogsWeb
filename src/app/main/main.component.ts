import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { CompanySettingsService } from '../company-settings/company-settings.service';
import { SearchPipe } from '../shared/pipes/search.pipe';
import { SelectedOrganizationService } from '../shared/services/selected-organizions/selected-organization.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  organizationsList: any = [];
  searchedOrganizationList: any = [];
  selectOrganization: any;
  @ViewChild('matAutocomplete') matAutocomplete!: MatAutocomplete;
  //Reference Variable //variable Name //Type

  constructor(private companySettingsService: CompanySettingsService,
              private selectedOrganizationService: SelectedOrganizationService) { }

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


  filterOrganization(event: any) {
    if (event.target.value) {
      const search = new SearchPipe();
      this.searchedOrganizationList = search.transform(this.organizationsList, event.target.value, 'organization');

    } else {
      this.organizationsList;
    }
  }

  seleectedOrganization(event: MatAutocompleteSelectedEvent) {

    this.selectOrganization = event.option.value;
    this.selectedOrganizationService.setSelectedOrganization(this.selectOrganization);    
  }

}
