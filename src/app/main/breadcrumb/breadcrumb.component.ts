import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CompanySettingsService } from 'src/app/company-settings/company-settings.service';
import { RouteConstants } from 'src/app/shared/constants/routes.constants';
import { SearchPipe } from 'src/app/shared/pipes/search.pipe';
import { SelectedOrganizationService } from 'src/app/shared/services/selected-organizions/selected-organization.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  organizationsList: any = [];
  searchedOrganizationList: any = [];
  selectOrganization: any;
  @ViewChild('matAutocomplete') matAutocomplete!: MatAutocomplete;
  currentRoute: any;
  ngOnInit(): void {
    this.getAllOrganizations()
  }


  constructor(private router: Router,
    private companySettingsService: CompanySettingsService,
    private selectedOrganizationService: SelectedOrganizationService
  ) {
    router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.currentRoute = event.url
    });
  }
  navigateToDashboard() {
    this.router.navigate([RouteConstants.DASHBOARD])
  }
  getAllOrganizations() {
    this.companySettingsService.getAllOrganizations().subscribe((res) => {
      this.organizationsList = res.organizations
      this.searchedOrganizationList = res.organizations
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
