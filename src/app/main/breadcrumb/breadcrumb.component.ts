import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ActivityFiltersData } from 'src/app/activity/activity-filterData';
import { CompanySettingsService } from 'src/app/company-settings/company-settings.service';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { OrganizationService } from 'src/app/organization/organization.service';
import { RouteConstants } from 'src/app/shared/constants/routes.constants';
import { Roles } from 'src/app/shared/enums/roles.enums';
import { STORAGE_KEYS } from 'src/app/shared/enums/storage.enum';
import { SearchPipe } from 'src/app/shared/pipes/search.pipe';
import { SelectedOrganizationService } from 'src/app/shared/services/selected-organizions/selected-organization.service';
import { StorageService } from 'src/app/shared/services/storage-service/storage.service';
import { BreadcrumbService } from './breadcrumb.service';

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
  isSuperAdmin!: boolean;
  logedInUserId: any;
  activityFiltersData = ActivityFiltersData
  selectedOrganizationIds: any;
  selectedActivityId: any;
  dashboardMetricsCount: any;


  constructor(private router: Router,
    private selectedOrganizationService: SelectedOrganizationService,
    private storageService: StorageService,
    private organizationService: OrganizationService,
    private breadcrumbService: BreadcrumbService,
    private dashboardService: DashboardService
  ) {
    router.events.pipe(filter((event: any) => event instanceof NavigationEnd)).subscribe(event => {
      this.currentRoute = event.url
    });
  }

  ngOnInit(): void {
    this.selectedOrganizationService.getSelectedOrganization().subscribe((res)=>{
      console.log(res);
      this.selectedOrganizationIds=res;
      this.postActivityStatusMetricsCount();
    })
    this.isSuperAdmin = this.storageService.getDataFromLocalStorage(STORAGE_KEYS.ROLE) === Roles.SuperAdmin ? true : false;
    this.logedInUserId = this.storageService.getDataFromLocalStorage(STORAGE_KEYS.USER_ID);
    this.getOrganizationsSearchCriteria();
    this.postActivityStatusMetricsCount();

  }
  navigateToDashboard() {
    this.router.navigate([RouteConstants.DASHBOARD])
  }

  getOrganizationsSearchCriteria() {
    if (this.isSuperAdmin) {
      const organizationListPayload = {
        pageNumber: 0,
        pageSize: 50,
        sortField: "",
        sortOrder: 0,
        type: "",
        organization: "",
        organizationId: "",
        isActive: true,
        userId: "",
        userSearch: ""
      }
      this.organizationService.getOrganizationsSearchCriteria(organizationListPayload).subscribe(res => {
        this.organizationsList = res.data?.organizations
        this.searchedOrganizationList = res?.data?.organizations
        // console.log(this.searchedOrganizationList)
      })
    } else {
      const organizationListPayload = {
        pageNumber: 0,
        pageSize: 50,
        sortField: "",
        sortOrder: 0,
        type: "",
        organization: "",
        organizationId: "",
        isActive: true,
        userId: this.logedInUserId,
        userSearch: ""
      }
      this.organizationService.getOrganizationsSearchCriteria(organizationListPayload).subscribe(res => {
        this.organizationsList = res?.data?.organizations
        this.searchedOrganizationList = res?.data?.organizations;
        let selectedOrganizations: any;
        selectedOrganizations = this.searchedOrganizationList.map((res: any) => {
          return res._id;
        })
        this.selectedOrganizationService.setSelectedOrganization(selectedOrganizations);

      })
    }
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
    if (event.option.value === 'all') {
      if (this.isSuperAdmin) {
        this.selectedOrganizationService.setSelectedOrganization([]);

      } else {
        let selectedOrganizations: any;
        selectedOrganizations = this.searchedOrganizationList.map((res: any) => {
          return res._id;
        })
        this.selectedOrganizationService.setSelectedOrganization(selectedOrganizations);

      }
    } else {
      let object = this.searchedOrganizationList.filter((res: any) => {
        return res.organization === this.selectOrganization
      })
      // let index = this.searchedOrganizationList.findIndex((org:any)=>{
      //   org.organization === this.selectOrganization;
      // })
      this.selectedOrganizationService.setSelectedOrganization([object[0]._id]);
    }
  }
  selectedActivitiesStatus(data: any) {
    this.breadcrumbService.setSelectedActivityStatus(data);
    console.log(data)
  }

  postActivityStatusMetricsCount() {
    const payload = {
      organizations: this.selectedOrganizationIds,
    }
    this.dashboardService.postDashBoardActivityMetrics(payload).subscribe(res => {
      this.dashboardMetricsCount = res.data[0]
      console.log(res);
    })
  }


}
