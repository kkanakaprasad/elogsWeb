import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanySettingsService } from 'src/app/company-settings/company-settings.service';
import { OrganizationService } from 'src/app/organization/organization.service';
import { AlertpopupService } from 'src/app/shared/alertPopup/alertpopup.service';
import { ConfirmationDialogService } from 'src/app/shared/confirmation-dialog/confirmation-dialog.service';
import { Roles } from 'src/app/shared/enums/roles.enums';
import { STORAGE_KEYS } from 'src/app/shared/enums/storage.enum';
import { SearchPipe } from 'src/app/shared/pipes/search.pipe';
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
  logedInUserId: any;
  logedInUserOrganizationData: any;
  selectedActivityId : string = '';


  constructor(
    private activityService: ActivityService,
    private organizationService: OrganizationService,
    private storageService: StorageService,
    private companySettingsService: CompanySettingsService,
    public confirmationPopup : ConfirmationDialogService,
    public alertPopupService : AlertpopupService,
    public dialogref: MatDialogRef<MoveToOrganizationPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) { 
    this.selectedActivityId = data
  }

  ngOnInit(): void {
    this.isSuperAdmin = this.storageService.getDataFromLocalStorage(STORAGE_KEYS.ROLE) === Roles.SuperAdmin ? true : false;
    this.logedInUserId = this.storageService.getDataFromLocalStorage(STORAGE_KEYS.USER_ID);
    if(this.isSuperAdmin){
      this.getAllOrganizations();
    }else{
      this.getOrganizationsSearchCriteria();
    }
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

  getOrganizationsSearchCriteria() {
    const payload = {
      pageNumber: 0,
      pageSize: 0,
      sortField: "",
      sortOrder: 0,
      type: "",
      role: "",
      userSearch: "",
      organizationId: "",
      organization: "",
      organizationSerach: "",
      userId: this.logedInUserId,
    }
    this.organizationService.getOrganizationsSearchCriteria(payload).subscribe((res) => {
      this.organizationsList = res.data.organizations;
      this.searchedOrganizationList = res.data.organizations;
    })
  }

  optionSelected(event:any){
    this.selectOrganization = event;
  }

  selectedOrganization(){
    this.confirmationPopup.open({
      message :`Are sure to move activity to ${this.selectOrganization.organization}`
    }).afterClosed().subscribe((res)=>{
      if(res){
        this.activityService.updateActivityOrganization({
          organzation : this.selectOrganization._id,
          activityId : this.selectedActivityId
        }).subscribe((res)=>{
            this.alertPopupService.open({
              message: 'Activity Updated Successfully',
              action: 'ok'
            })
        },(error)=>{
          this.alertPopupService.open({
            message: error.message ?error.message : 'Unable to move organization to this activity',
            action: 'ok'
          })
        })
      }
    })
  }
}
