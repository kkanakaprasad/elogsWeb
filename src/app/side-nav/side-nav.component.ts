import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrganizationService } from '../organization/organization.service';
import { RouteConstants } from '../shared/constants/routes.constants';
import { Roles } from '../shared/enums/roles.enums';
import { STORAGE_KEYS } from '../shared/enums/storage.enum';
import { StorageService } from '../shared/services/storage-service/storage.service';
import { UserDetails } from '../shared/services/user-details-service/user-details.interface';
import { UserDetailsService } from '../shared/services/user-details-service/user-details.service';
import { EventCommunicationsService } from '../shared/services/event-communications.service';
import { DocumentsService } from '../documents/documents.service';
import { SelectedOrganizationService } from '../shared/services/selected-organizions/selected-organization.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  page = 'dashboard';
  logedInRole = '';
  logedinUserDetails: UserDetails = {
    Name: '',
    email: '',
    roles: [''],
  };
  isSuperAdmin: boolean = false;
  activityCount: number = 0;
  documentsCount: number = 0;
  documentPayload: any = {
    pageNumber: 0,
    pageSize: 1,
    sortField: '',
    groupBy: 0,
    fileNameSearchText: '',
    organizations: [],
    isArchived: false,
  };

  constructor(
    private userDetailsService: UserDetailsService,
    private storageService: StorageService,
    private router: Router,
    private organizationService: OrganizationService,
    private eventCommunicationsService: EventCommunicationsService,
    private documentService: DocumentsService,
    private selectedOrganizationService: SelectedOrganizationService
  ) {}

  ngOnInit(): void {
    this.getLogedInUserDeatils();
    this.isSuperAdmin =
      this.storageService.getDataFromLocalStorage(STORAGE_KEYS.ROLE) ===
      Roles.SuperAdmin
        ? true
        : false;
    this.logedInRole = this.storageService.getDataFromLocalStorage(
      STORAGE_KEYS.ROLE
    );
    this.eventCommunicationsService.on('ACTIVITY_COUNT').subscribe((data) => {
      this.activityCount = data;
    });
    this.eventCommunicationsService.on('DOC_COUNT').subscribe((res: any) => {
      this.documentsCount = res;
    });
    this.selectedOrganizationService
      .getSelectedOrganization()
      .subscribe((res: any) => {
        if (res.length !== 0) {
          this.documentPayload = {
            ...this.documentPayload,
            organizations: res,
          };
        }
        this.getDocumentsCount();
      });
  }

  getDocumentsCount() {
    this.documentService
      .postActivityAttachments(this.documentPayload)
      .subscribe((res: any) => {
        this.documentsCount = res?.data[0].count[0]?.count;
        this.eventCommunicationsService.broadcast(
          'DOC_COUNT',
          this.documentsCount
        );
      });
  }

  getLogedInUserDeatils() {
    this.userDetailsService.getUserDetails().subscribe((res) => {
      this.logedinUserDetails = res;
    });
  }

  navigateToOrganizationList() {
    this.router.navigate([RouteConstants.ORAGANIZATION_LIST]);
  }

  naviagteToDashboard() {
    this.router.navigate([RouteConstants.DASHBOARD]);
  }

  naviagteToUserList() {
    this.router.navigate([RouteConstants.USER_LIST]);
  }

  change(name: any) {
    this.page = name;
  }

  navigateToAcitivities() {
    this.router.navigate([RouteConstants.ACTIVITY]);
  }

  navigateToCreateActivity() {
    this.router.navigate([RouteConstants.CREATEACTIVITY]);
  }

  openCreateOrganizationPopup() {
    this.organizationService.openCreateOrganizatioPopup();
  }

  naviagteToCompanySettings() {
    this.router.navigate([RouteConstants.COMPANY_SETTINGS]);
  }

  naviagteToArchive() {
    this.router.navigate([RouteConstants.ARCHIVE]);
  }

  naviagteToDocuments() {
    this.router.navigate([RouteConstants.DOCUMENTS]);
  }
}
