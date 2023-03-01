import { Component, OnInit } from '@angular/core';
import { AlertpopupService } from 'src/app/shared/alertPopup/alertpopup.service';
import { ConfirmationDialogService } from 'src/app/shared/confirmation-dialog/confirmation-dialog.service';
import { FILTER_CONSTANT } from 'src/app/shared/constants/filter.constants';
import { MasterDataService } from 'src/app/shared/services/master-data/master-data.service';
import { StorageService } from 'src/app/shared/services/storage-service/storage.service';
import { AddNewUserService } from 'src/app/user/add-new-user/add-new-user.service';
import { AddUserPopUpService } from '../add-user-pop-up/add-user-pop-up.service';
import { CreateOrganization, OrganizationSearchCriteria } from '../organization.interface';
import { OrganizationService } from '../organization.service';
import { RemoveUserPopUpService } from '../remove-user-pop-up/remove-user-pop-up.service';
import { STORAGE_KEYS } from 'src/app/shared/enums/storage.enum';
import { Roles } from 'src/app/shared/enums/roles.enums'
import { EventCommunicationsService } from 'src/app/shared/services/event-communications.service';

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
  updatedPayload = this.organizationListPayload;
  organizationTypes: any;
  isUser = false;
  activeMetricsCount: number=0;
  associationsMetricsCount: number=0  ;
  ministriesMetricsCount: number=0;
  inActiveMetricsCount: number=0;
  showActionBtn:boolean = true;
  constructor(private organizationService: OrganizationService,
    private masterDataService: MasterDataService,
    private addUserPopUpService: AddUserPopUpService,
    private alertpopupService: AlertpopupService,
    private removeUserPopUpService: RemoveUserPopUpService,
    private confirmationDialogService: ConfirmationDialogService,
    private storageService: StorageService,
    private eventCommunicationsService: EventCommunicationsService,
    ) { }


  ngOnInit(): void {
    this.getAllOrganizationsSearchCriteria();
    this.eventCommunicationsService.on('NEW_USER_CREATED').subscribe((res)=>{
      if(res){
        this.getAllOrganizationsSearchCriteria();
      }
    })
    this.eventCommunicationsService.on('NEW_ORGANIZATION_CREATED').subscribe((res)=>{
      if(res){
        this.getAllOrganizationsSearchCriteria();
      }
    })
    this.getOrganizationTypes();
  }

  getOrganizationTypes() {
    this.masterDataService.getOrganizationTypes().subscribe((res) => {
      this.organizationTypes = res.data;
    })
  }

  getAllOrganizationsSearchCriteria() {
    if (this.storageService.getDataFromLocalStorage(STORAGE_KEYS.ROLE) === Roles.User) {
      this.isUser = true;
      this.updatedPayload = { ...this.updatedPayload, userId: this.storageService.getDataFromLocalStorage(STORAGE_KEYS.USER_ID) };
    }
    this.organizationService.getOrganizationsSearchCriteria(this.updatedPayload).subscribe((res) => {
      this.organizationList = res.data.organizations.reverse();
      this.activeMetricsCount=res.data.metrics[0].active[0]?.activeOrganizatiosns
      this.associationsMetricsCount=res.data.metrics[0].associations[0]?.associationCount
      this.ministriesMetricsCount=res.data.metrics[0].ministries[0]?.ministriesCount
      this.inActiveMetricsCount=res.data.metrics[0].inActive[0]?.inActiveOrganizatiosns>0?res.data.metrics[0].inActive[0]?.inActiveOrganizatiosns:0
    })
  }

  applyOrganizationFilters(user: any) {
    this.updatedPayload = this.organizationListPayload;
    if (Number(user.tab.textLabel) === FILTER_CONSTANT.MINISTRIES) {
      this.updatedPayload = {
        ...this.updatedPayload,
        isActive: true,
        type: this.organizationTypes[FILTER_CONSTANT.MINISTRIES]._id
      }
    } else if (Number(user.tab.textLabel) === FILTER_CONSTANT.IS_ACTIVE) {
      this.updatedPayload = {
        ...this.updatedPayload,
        isActive: true
      }
    } else if (Number(user.tab.textLabel) === FILTER_CONSTANT.ASSOCIATION) {
      this.updatedPayload = {
        ...this.updatedPayload,
        isActive: true,
        type: this.organizationTypes[FILTER_CONSTANT.ASSOCIATION]._id
      }
    } else if (Number(user.tab.textLabel) === FILTER_CONSTANT.INACTIVE) {
      this.updatedPayload = {
        ...this.updatedPayload,
        isActive: false
      }
    }

    this.getAllOrganizationsSearchCriteria();
  }

  updateOrganization(organizationId: string) {
    this.organizationService.updateOrganizatioPopup(organizationId).afterClosed().subscribe((res) => {
      if (res) {
        this.getAllOrganizationsSearchCriteria();
      }
    })
  }

  createOrganization() {
    this.organizationService.openCreateOrganizatioPopup().afterClosed().subscribe((res) => {
      if (res) {
        this.getAllOrganizationsSearchCriteria();

      }
    })
  }

  openAddUserPopup(selectedOrganizationId: string) {
    this.addUserPopUpService.openAddUser(selectedOrganizationId).afterClosed().subscribe((res) => {
      if (res) {
        this.getAllOrganizationsSearchCriteria();
      }
    });
  }

  openRemoveUserPopup(selectedOrganizationId: string) {
    this.removeUserPopUpService.removeUserPopUp(selectedOrganizationId).afterClosed().subscribe((res) => {
      if (res) {
        this.getAllOrganizationsSearchCriteria();
      }
    });
  }

  disableOrganization(organizationListId: string, organizationName: string) {
    this.confirmationDialogService.open({
      message: `Are you sure to Disable ${organizationName}`
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.organizationService.getorganizationById(organizationListId).subscribe(res => {
          const payload = {
            ...res.organization,
            isActive: false
          }
          this.organizationService.updateOrganization(organizationListId, payload).subscribe((res) => {
            this.alertpopupService.open({
              message: res.message,
              action: 'ok'
            })
            this.getAllOrganizationsSearchCriteria();
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

  enableOrganization(organizationListId: string, organizationName: string) {
    this.confirmationDialogService.open({
      message: `Are you Sure to Enable ${organizationName} `
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.organizationService.getorganizationById(organizationListId).subscribe(res => {
          const payload = {
            ...res.organization,
            isActive: true
          }
          this.organizationService.updateOrganization(organizationListId, payload).subscribe((res) => {
            this.alertpopupService.open({
              message: res.message,
              action: 'ok'
            })

            this.getAllOrganizationsSearchCriteria();

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

  openActionBtn(){
    this.showActionBtn = !this.showActionBtn
  }

  removeOrganization(organizationId: string, organizationName: string) {

    this.confirmationDialogService.open({
      message: `Are you Sure to Delete ${organizationName}`
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.confirmationDialogService.open({
          message: `All the Activities, Files associated with ${organizationName} will be deleted permanently. `
        }).afterClosed().subscribe((res) => {
          if (res) {
            this.organizationService.deleteUser(organizationId).subscribe(res => {
              res
              this.alertpopupService.open({
                message: res.message,
                action: 'ok'
              })
              this.getAllOrganizationsSearchCriteria();

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
    )
  }
}


