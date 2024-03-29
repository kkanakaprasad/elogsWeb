import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivityService } from '../activity/activity.service';
import { AlertpopupService } from '../shared/alertPopup/alertpopup.service';
import { PaginationProps } from '../shared/constants/pagination';
import { Roles } from '../shared/enums/roles.enums';
import { SelectedOrganizationService } from '../shared/services/selected-organizions/selected-organization.service';
import { UserDetailsService } from '../shared/services/user-details-service/user-details.service';
import { DocumentsService } from './documents.service';
import { EventCommunicationsService } from '../shared/services/event-communications.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent implements OnInit, AfterViewInit {
  totalUserCount: number = 0;
  selectedDocument: any;
  paginationProps = PaginationProps;
  attachmentsDetails: any = [];
  documentsPayload: any = {
    pageNumber: 0,
    pageSize: 10,
    sortField: '',
    groupBy: 0,
    fileNameSearchText: '',
    organizations: [],
    isArchived: false,
  };
  displayedColumns = ['Activity', 'FileName', 'Size', 'Organization'];
  dataSource = new MatTableDataSource(this.attachmentsDetails);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  totalDocumentCount: any;

  constructor(
    private documentsService: DocumentsService,
    private activityService: ActivityService,
    private selectedOrganizationService: SelectedOrganizationService,
    private userDetailsService: UserDetailsService,
    private alertpopupService: AlertpopupService,
    private eventCommunicationsService: EventCommunicationsService,
    private confirmationService: ConfirmationDialogService
  ) {}
  ngOnInit(): void {
    this.userDetailsService.getUserDetails().subscribe((res) => {
      if (res.roles[0] === Roles.User) {
        this.documentsPayload.organizations = res.organization;
      }
      this.postActivityAttachments();
    });

    this.selectedOrganizationService
      .getSelectedOrganization()
      .subscribe((res: any) => {
        this.documentsPayload['organizations'] = res;
        this.postActivityAttachments();
      });
  }

  groupedAttachemtns(docs: any) {
    const groupedResponse = docs.reduce(function (r: any, a: any) {
      const date = a.nestedAttchments.createdAt.split('T')[0];
      r[date] = r[date] || [];
      r[date].push(a);
      return r;
    }, Object.create(null));

    let resp: any = [];
    Object.keys(groupedResponse).forEach((k) => {
      resp.push({ initial: k, isGroupBy: true });
      resp = resp.concat(groupedResponse[k]);
      
    });
    return resp;
  }

  isGroup(index: any, item: any): boolean {
    return item.isGroupBy;
  }

  postActivityAttachments() {
    this.documentsService
      .postActivityAttachments(this.documentsPayload)
      .subscribe((res) => {
        this.attachmentsDetails = this.groupedAttachemtns(
          res?.data[0]?.attachments
        );
        this.totalDocumentCount = res?.data[0]?.count[0]?.count;
        this.dataSource = new MatTableDataSource(this.attachmentsDetails);
        this.eventCommunicationsService.broadcast(
          'DOC_COUNT',
          this.totalDocumentCount
        );
      });
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
      path: `${element._id}`,
    };

    if (element.nestedAttchments.activityLogId) {
      payload.path = `${element._id}/${element.nestedAttchments.activityLogId}`;
    }

    this.activityService.dowloadAttachments(payload).subscribe(
      (blob) => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = element.nestedAttchments.name;
        link.click();
        window.URL.revokeObjectURL(link.href);
        this.alertpopupService.open({
          message: 'Attachment downloaded successfully',
          action: 'Ok',
        });
      },
      (error: any) => {
        this.alertpopupService.open({
          message: 'Attachment Not Found',
          action: 'Ok',
        });
      }
    );
  }

  removeDocument() {
    const payload = [
      {
        activityId: this.selectedDocument.nestedAttchments.activityId,
        activityLogId: this.selectedDocument.nestedAttchments.activityLogId
          ? this.selectedDocument.nestedAttchments.activityLogId
          : null,
        attchmentId: this.selectedDocument.nestedAttchments._id,
      },
    ];
    this.confirmationService
      .open({
        message: 'Are you sure to remove document',
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.documentsService.removeDocument(payload).subscribe(
            (res: any) => {
              this.alertpopupService.open({
                message: 'Document deleted successfully',
                action: 'ok',
              });
              this.postActivityAttachments();
            },
            (error: any) => {
              this.alertpopupService.open({
                message: error.message
                  ? error.message
                  : 'Unable to remove document',
                action: 'ok',
              });
            }
          );
        }
      });
  }

  archiveDocument() {
    const payload = [
      {
        activityId: this.selectedDocument.nestedAttchments.activityId,
        activityLogId: this.selectedDocument.nestedAttchments.activityLogId
          ? this.selectedDocument.nestedAttchments.activityLogId
          : null,
        attchmentId: this.selectedDocument.nestedAttchments._id,
      },
    ];
    this.confirmationService
      .open({
        message: 'Are you sure to archive',
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.documentsService.archiveDocument(payload).subscribe(
            (res: any) => {
              this.alertpopupService.open({
                message: 'Archived successfully',
                action: 'ok',
              });
              this.postActivityAttachments();
            },
            (error: any) => {
              this.alertpopupService.open({
                message: error.message ? error.message : 'Unable to archive',
                action: 'ok',
              });
            }
          );
        }
      });
  }

  getIconClass(mimeType: string): string {
    let IconClass: string = '';

    switch (mimeType) {
      case 'application/pdf':
        IconClass = 'pdf_icon';
        break;
      case 'application/vnd.ms-excel':
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      case 'application/xls':
      case 'application/xlsx':
        IconClass = 'Excel_icon';
        break;
      case 'image/jpeg':
      case 'image/jpg':
      case 'image/png':
      case 'image/gif':
        IconClass = 'img_icon';
        break;
      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        IconClass = 'Word_icon';
        break;
      case 'application/vnd.ms-powerpoint':
      case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        IconClass = 'file_icon';
        break;
      default:
        IconClass = 'file_icon';
        break;
    }

    return IconClass;
  }
}
