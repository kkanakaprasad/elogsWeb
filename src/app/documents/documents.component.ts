import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivityService } from '../activity/activity.service';
import { BreadcrumbService } from '../main/breadcrumb/breadcrumb.service';
import { AlertpopupService } from '../shared/alertPopup/alertpopup.service';
import { PaginationProps } from '../shared/constants/pagination';
import { Roles } from '../shared/enums/roles.enums';
import { SelectedOrganizationService } from '../shared/services/selected-organizions/selected-organization.service';
import { UserDetailsService } from '../shared/services/user-details-service/user-details.service';
import { DocumentsService } from './documents.service';
import { EventCommunicationsService } from '../shared/services/event-communications.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit, AfterViewInit {
  totalUserCount: number = 0;
  paginationProps = PaginationProps;
  attachmentsDetails: any = [];
  documentsPayload: any = {
    pageNumber: 0,
    pageSize: 10,
    sortField: "",
    groupBy: 0,
    fileNameSearchText: "",
    organizations : []
  }
  displayedColumns = ['Activity', 'FileName', 'Size', 'Organisation']
  dataSource = new MatTableDataSource(this.attachmentsDetails);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  totalDocumentCount: any;


  constructor(private documentsService: DocumentsService,
    private activityService: ActivityService,
    private selectedOrganizationService:SelectedOrganizationService,
    private userDetailsService: UserDetailsService,
    private alertpopupService: AlertpopupService,
    private eventCommunicationsService : EventCommunicationsService
  ) {

  }
  ngOnInit(): void {
    this.userDetailsService.getUserDetails().subscribe((res)=>{
      if(res.roles[0]=== Roles.User){
        this.documentsPayload.organizations = res.organization;
      }
      this.postActivityAttachments();
    });
    
    this.selectedOrganizationService.getSelectedOrganization().subscribe((res:any)=>{
      this.documentsPayload['organizations'] = res;
      this.postActivityAttachments();
    })

  }

  postActivityAttachments() {
    this.documentsService.postActivityAttachments(this.documentsPayload).subscribe(res => {
      this.attachmentsDetails = res?.data[0]?.attachments
      this.totalDocumentCount = res?.data[0]?.count[0]?.count
      this.dataSource = new MatTableDataSource(this.attachmentsDetails)
      this.eventCommunicationsService.broadcast('DOC_COUNT',this.totalDocumentCount)
    })
  }

  onChangedPageSize(event: any) {
    this.documentsPayload.pageNumber = this.paginator?.pageIndex;
    this.documentsPayload.pageSize = this.paginator?.pageSize;
    this.postActivityAttachments();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  downloadDocumement(element: any) {
    const payload = {
      fileName: element.nestedAttchments.name,
      path: `${element._id}`
    }

    if (element.nestedAttchments.activityLogId) {
      payload.path = `${element._id}/${element.nestedAttchments.activityLogId}`
    }

    this.activityService.dowloadAttachments(payload).subscribe((blob => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = element.nestedAttchments.name;
      link.click();
      window.URL.revokeObjectURL(link.href);
      this.alertpopupService.open({
        message : 'Attachment downloaded successfully',
        action : 'Ok'
      })
    }), (error: any) => {
      this.alertpopupService.open({
        message : 'Attachment Not Found',
        action : 'Ok'
      }
      )
    })

  }
}
