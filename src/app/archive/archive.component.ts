import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertpopupService } from '../shared/alertPopup/alertpopup.service';
import { RouteConstants } from '../shared/constants/routes.constants';
import { ArchiveService } from './archive.service';
import { DocumentsService } from '../documents/documents.service';
import { MatPaginator } from '@angular/material/paginator';
import { PaginationProps } from '../shared/constants/pagination';
import { ActivityService } from '../activity/activity.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
})
export class ArchiveComponent implements OnInit {
  archiveActivitiesList: any = [];
  taskDisplayedColumns = [
    'checkbox',
    'Activity',
    'Title',
    'Status',
    'Organization',
  ];
 
  dataSource = new MatTableDataSource(this.archiveActivitiesList);
  selection = new SelectionModel<any>(true, []);
  archiveDocuments: any = [];
  archiveDocumentsTotalCount: any;
  paginationProps = PaginationProps;
  fileSelection = new SelectionModel<any>(true, []);

  displayedColumns = [
    'checkbox',
    'Activity',
    'FileName',
    'Size',
    'Organization',
  ];
  dataSourceArchiveDocs = new MatTableDataSource(this.archiveDocuments);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  documentsPayload: any = {
    pageNumber: 0,
    pageSize: 10,
    sortField: '',
    groupBy: 0,
    fileNameSearchText: '',
    organizations: [],
    isArchived: true,
  };

  constructor(
    private archiveService: ArchiveService,
    private router: Router,
    private alertpopupService: AlertpopupService,
    private documentsService: DocumentsService,
    private activityService: ActivityService,
    private confirmationService: ConfirmationDialogService
  ) {}

  ngOnInit(): void {
    this.getArchiveActivities();
    this.getAllArchiveDocuments();
  }

  getArchiveActivities() {
    this.archiveService.getArchiveActivities().subscribe((res) => {
      this.archiveActivitiesList = res.data;
      console.log(this.archiveActivitiesList);
      this.dataSource = new MatTableDataSource(this.archiveActivitiesList);
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  isAllFileSelection() {
    const selectedFileLength = this.fileSelection.selected.length;
    return selectedFileLength === this.archiveDocumentsTotalCount;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  masterFilesToggle() {
    this.isAllFileSelection()
      ? this.fileSelection.clear()
      : this.dataSourceArchiveDocs.data.forEach((row) =>
          this.fileSelection.select(row)
        );
  }

  logSelection() {
    this.selection.selected.forEach((value) => {});
  }
  navigateToActivityDetails(activity: any) {
    this.router.navigate([RouteConstants.ACTIVITY_DETAILS], {
      queryParams: { aId: activity },
    });
  }

  archiveActionClick(type: string) {
    if (type === 'Restore') {
      const payload = {
        activityIds: this.selection.selected.map((res) => res._id),
        isArchive: false,
      };
      this.archiveService.postRestoreSelectedActivities(payload).subscribe(
        (res) => {
          if (res) {
            this.alertpopupService.open({
              message: res?.message
                ? res?.message
                : 'Activities archived successfully',
              action: 'ok',
            });
            this.getArchiveActivities();
          }
        },
        (error) => {
          this.alertpopupService.open({
            message: error?.message
              ? error?.message
              : 'Failed to archive Activities  ',
            action: 'ok',
          });
        }
      );
    } else if (type === 'Remove') {
      this.archiveService
        .postDeleteSelectedActivities({
          activityIds: this.selection.selected.map((res) => res._id),
        })
        .subscribe(
          (res) => {
            if (res) {
              this.alertpopupService.open({
                message: res?.message
                  ? res?.message
                  : 'Activities removed successfully',
                action: 'ok',
              });
              this.getArchiveActivities();
            }
          },
          (error) => {
            this.alertpopupService.open({
              message: error?.message
                ? error?.message
                : 'Failed to remove Activities  ',
              action: 'ok',
            });
          }
        );
    }
  }

  getAllArchiveDocuments() {
    this.documentsService
      .postActivityAttachments(this.documentsPayload)
      .subscribe((res) => {
        this.archiveDocuments = res?.data[0]?.attachments;
        this.archiveDocumentsTotalCount = res?.data[0]?.count[0]?.count;
        this.dataSourceArchiveDocs = new MatTableDataSource(
          this.archiveDocuments
        );
      });
  }
  onChangedPageSize(event: any) {
    this.documentsPayload.pageNumber = this.paginator?.pageIndex;
    this.documentsPayload.pageSize = this.paginator?.pageSize;
    this.getAllArchiveDocuments();
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

  removeFile() {
    const payload = this.fileSelection.selected.map((file) => {
      return {
        activityId: file.nestedAttchments.activityId,
        activityLogId: file.nestedAttchments.activityLogId
          ? file.nestedAttchments.activityLogId
          : null,
        attchmentId: file.nestedAttchments._id,
      };
    });
    this.confirmationService
      .open({
        message: 'Are you sure to remove documents',
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.documentsService.removeDocument(payload).subscribe(
            (res: any) => {
              this.alertpopupService.open({
                message: 'Documents removed successfully',
                action: 'ok',
              });
              this.getAllArchiveDocuments();
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

  restoreFile() {
    const payload = this.fileSelection.selected.map((file) => {
      return {
        activityId: file.nestedAttchments.activityId,
        activityLogId: file.nestedAttchments.activityLogId
          ? file.nestedAttchments.activityLogId
          : null,
        attchmentId: file.nestedAttchments._id,
      };
    });
    this.confirmationService
      .open({
        message: 'Are you sure to restore documents',
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.archiveService.restoreDocuments(payload).subscribe(
            (res: any) => {
              this.alertpopupService.open({
                message: 'Documents restored successfully',
                action: 'ok',
              });
              this.getAllArchiveDocuments();
            },
            (error: any) => {
              this.alertpopupService.open({
                message: error.message
                  ? error.message
                  : 'Unable to restore document',
                action: 'ok',
              });
            }
          );
        }
      });
  }
}
