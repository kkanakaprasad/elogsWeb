import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { AlertpopupService } from '../alertPopup/alertpopup.service';

@Component({
  selector: 'app-fileuploader',
  templateUrl: './fileuploader.component.html',
  styleUrls: ['./fileuploader.component.css'],
})
export class FileuploaderComponent implements OnChanges {
  fileType: any;

  @Output() updatedFilesDescription = new EventEmitter<any>();
  @Input() value: any = false;
  constructor(private alertpopupService: AlertpopupService) {}

  files: any[] = [];
  filesEvent: any;

  /**
   * on file drop handler
   */
  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value'].currentValue === false) {
      this.files = [];
    }
  }

  clearFiles() {
    this.files =[];
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files: any) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
    const dt = new DataTransfer();
    for (let i = 0; i < this.filesEvent.target.files.length; i++) {
      const file = this.filesEvent.target.files[i];
      if (index !== i) dt.items.add(file); // here you exclude the file. thus removing it.
    }
    this.filesEvent.target.files = dt.files;
    this.updatedFilesDescription.emit(this.filesEvent);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: any) {
    for (const item of files?.target.files) {
      if (
        item.type == 'image/jpeg' ||
        item.type == 'text/plain' ||
        item.type ==
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        item.type == 'image/png' ||
        item.type ==
          'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
        item.type == 'application/pdf' ||
        item.type == 'csv' || item.type ==  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel' ||
        (item.type ==
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
          item.size <= 10485760)
      ) {
        this.files.push(item);
      } else {
        this.alertpopupService.open({
          message: `${item.type} is not accept `,
          action: 'ok',
        });
      }
    }
    this.filesEvent = files;
    this.updatedFilesDescription.emit(files);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: any, decimals?: any) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
