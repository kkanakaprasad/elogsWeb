import { Component, OnInit } from '@angular/core';
import { AlertpopupService } from 'src/app/shared/alertPopup/alertpopup.service';
import { ConfirmationDialogService } from 'src/app/shared/confirmation-dialog/confirmation-dialog.service';
import { FILTER_CONSTANT } from 'src/app/shared/constants/filter.constants';
import { MasterDataService } from 'src/app/shared/services/master-data/master-data.service';
import { AddNewUserService } from 'src/app/user/add-new-user/add-new-user.service';
import { AddUserPopUpService } from '../add-user-pop-up/add-user-pop-up.service';
import { CreateOrganization, OrganizationSearchCriteria } from '../organization.interface';
import { OrganizationService } from '../organization.service';
import { RemoveUserPopUpService } from '../remove-user-pop-up/remove-user-pop-up.service';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit {
  organizationList: any;
  filters = FILTER_CONSTANT;
  organizationListPayload: OrganizationSearchCriteria = {
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
  organizationTypes: any;

  constructor(private organizationService: OrganizationService,
    private masterDataService: MasterDataService,
    private addUserPopUpService: AddUserPopUpService,
    private alertpopupService: AlertpopupService,
    private removeUserPopUpService: RemoveUserPopUpService,
    private confirmationDialogService: ConfirmationDialogService) { }


  ngOnInit(): void {
    this.getAllOrganizationsSearchCriteria(this.organizationListPayload);
    this.getOrganizationTypes();
  }

  getOrganizationTypes() {
    this.masterDataService.getOrganizationTypes().subscribe((res) => {
      this.organizationTypes = res.data;
      console.log(this.organizationTypes);
    })
  }

  getAllOrganizationsSearchCriteria(payload: OrganizationSearchCriteria) {
    this.organizationService.getOrganizationsSearchCriteria(payload).subscribe((res) => {
      this.organizationList = res.organizations[0].organizations.reverse();

    })

  }

  applyOrganizationFilters(type: number) {
    let updatedPayload = this.organizationListPayload;
    if (FILTER_CONSTANT.MINISTRIES === type) {
      updatedPayload = {
        ...updatedPayload,
        isActive: true,
        type: this.organizationTypes[FILTER_CONSTANT.MINISTRIES]._id
      }
    } else if (FILTER_CONSTANT.IS_ACTIVE === type) {
      updatedPayload = {
        ...updatedPayload,
        isActive: true
      }
    } else if (FILTER_CONSTANT.ASSOCIATION === type) {
      updatedPayload = {
        ...updatedPayload,
        isActive: true,
        type: this.organizationTypes[FILTER_CONSTANT.ASSOCIATION]._id
      }
    } else if (FILTER_CONSTANT.INACTIVE === type) {
      updatedPayload = {
        ...updatedPayload,
        isActive: false
      }
    }

    this.getAllOrganizationsSearchCriteria(updatedPayload);
  }

  updateOrganizationList(organizationId: string) {
    this.organizationService.updateOrganizatioPopup(organizationId)
  }

  addOrganizationList() {

    this.organizationService.openCreateOrganizatioPopup().afterClosed().subscribe((res) => {
      if (res) {
        this.getAllOrganizationsSearchCriteria(this.organizationListPayload)

      }
    })
  }

  openAddUserPopup(selectedOrganizationId: string) {
    this.addUserPopUpService.openAddUser(selectedOrganizationId);
  }

  removeUserPopup(selectedOrganizationId: string) {
    this.removeUserPopUpService.removeUserPopUp(selectedOrganizationId);
  }

  disableAssociation(organizationListId: string) {

    this.confirmationDialogService.open({
      message: 'Are you Sure to Disable organization!!'
    }).afterClosed().subscribe((res)=>{
      if(res){
        this.organizationService.getorganizationById(organizationListId).subscribe(res => {
          console.log(res)
          const payload = {
            ...res.organization,
            isActive: false
          }
          this.organizationService.updateOrganization(organizationListId, payload).subscribe((res) => {
            console.log(res);
            this.alertpopupService.open({
              message: res.message,
              action: 'ok'
            })
            this.getAllOrganizationsSearchCriteria(this.organizationListPayload);
          }, (error) => {
            this.alertpopupService.open({
              message: "Faild to create Organization! Please try again ",
              action: 'ok'
            })
          })
        })
      }
    })


    
  }

  enableAssociation(organizationListId: string) {
    this.confirmationDialogService.open({
      message: 'Are you Sure to Enable User!!'
    }).afterClosed().subscribe((res)=>{
      if(res){
        this.organizationService.getorganizationById(organizationListId).subscribe(res => {
          console.log(res)
          const payload = {
            ...res.organization,
            isActive: true
          }
          this.organizationService.updateOrganization(organizationListId, payload).subscribe((res) => {
            console.log(res);
            this.alertpopupService.open({
              message: res.message,
              action: 'ok'
            })
            this.getAllOrganizationsSearchCriteria(this.organizationListPayload);
          }
            , (error) => {
              this.alertpopupService.open({
                message: "Faild to create Organization! Please try again ",
                action: 'ok'
              })
            })
        })
    
      }
    })
    
  }

  removeUser(organizationId: string) {

    this.confirmationDialogService.open({
      message: 'Are you Sure to Delete User'
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.organizationService.deleteUser(organizationId).subscribe(res => {
          res
          this.alertpopupService.open({
            message: res.message,
            action: 'ok'
          })
          this.getAllOrganizationsSearchCriteria(this.organizationListPayload);
        }, (error) => {
          this.alertpopupService.open({
            message: "Faild to create Organization! Please try again ",
            action: 'ok'
          })
        }
        )
      }
    })
    
  }


}


