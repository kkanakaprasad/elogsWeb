import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { CompanySettingsService } from 'src/app/company-settings/company-settings.service';
import { OrganizationSearchCriteria } from 'src/app/organization/organization.interface';
import { OrganizationService } from 'src/app/organization/organization.service';
import { Roles } from 'src/app/shared/enums/roles.enums';
import { STORAGE_KEYS } from 'src/app/shared/enums/storage.enum';
import { SearchPipe } from 'src/app/shared/pipes/search.pipe';
import { SelectedOrganizationService } from 'src/app/shared/services/selected-organizions/selected-organization.service';
import { StorageService } from 'src/app/shared/services/storage-service/storage.service';
import { ActivityService } from '../activity.service';

@Component({
  selector: 'app-move-to-organization-pop-up',
  templateUrl: './move-to-organization-pop-up.component.html',
  styleUrls: ['./move-to-organization-pop-up.component.scss']
})
export class MoveToOrganizationPopUpComponent implements OnInit {
  selectOrganization: any;
  organizationsList: any = [];
  searchedOrganizationList: any = [];
  isSuperAdmin: boolean = false;
  //logedInRole = '';
  logedInUserId:any;
  logedInUserOrganizationData: any;


  constructor(
    private activityService: ActivityService,
    private selectedOrganizationService: SelectedOrganizationService,
    private organizationService: OrganizationService,
    private storageService: StorageService,
    private matDialog: MatDialog,
    private companySettingsService: CompanySettingsService
  ) { }

  ngOnInit(): void {
    this.isSuperAdmin = this.storageService.getDataFromLocalStorage(STORAGE_KEYS.ROLE) === Roles.SuperAdmin ? true : false;
    //this.logedInRole = this.storageService.getDataFromLocalStorage(STORAGE_KEYS.ROLE);
    this.logedInUserId= this.storageService.getDataFromLocalStorage(STORAGE_KEYS.USER_ID)
    this.getAllOrganizations();
    this.getOrganizationsSearchCriteria()
  }

  getAllOrganizations() {
    this.companySettingsService.getAllOrganizations().subscribe((res) => {
      this.organizationsList = res.organizations
      this.searchedOrganizationList = res.organizations
    })
  }

  seleectedOrganization(event: MatAutocompleteSelectedEvent) {

    this.selectOrganization = event.option.value;
    this.selectedOrganizationService.setSelectedOrganization(this.selectOrganization);
  }

  filterOrganization(event: any) {
    if (event.target.value) {
      const search = new SearchPipe();
      this.searchedOrganizationList = search.transform(this.organizationsList, event.target.value, 'organization');

    } else {
      this.organizationsList;
    }
  }

  openMoveToOrganizationPopup() {

    return this.matDialog.open(MoveToOrganizationPopUpComponent, {width: '500px' })
  }

  getOrganizationsSearchCriteria() {
    
      const payload = {
        pageNumber: 0,
        pageSize: 0,
        sortField: "",
        sortOrder: 0,
        type: "",
        role:"",
        userSearch:"",
        organizationId:"",
        organization:"",
        organizationSerach:"",
        userId: this.logedInUserId,
      }
  
    this.organizationService.getOrganizationsSearchCriteria(payload).subscribe((res) => {
     
      this.logedInUserOrganizationData=res.data.organizations
      console.log(this.logedInUserOrganizationData);
    })
  }

  selectedOrganization(value:any){
    console.log(value);
  }
}
