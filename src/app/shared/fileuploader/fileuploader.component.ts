import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertpopupService } from '../alertPopup/alertpopup.service';

@Component({
  selector: 'app-fileuploader',
  templateUrl: './fileuploader.component.html',
  styleUrls: ['./fileuploader.component.css']
})
export class FileuploaderComponent implements OnInit {
  fileType: any;
  
  @Output() updatedFilesDescription = new EventEmitter<any>();

  constructor(private alertpopupService :AlertpopupService) { }

  ngOnInit() {
  }
  files: any[] = [];

  /**
   * on file drop handler
   */
  onFileDropped($event:any) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files:any) {
    this.prepareFilesList(files.target.files);
  
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

 
  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    
    for (const item of files) {
      if(item.type=='image/jpeg'||item.type=='text/plain'||item.type=='application/vnd.openxmlformats-officedocument.wordprocessingml.document'||item.type=='image/png'||item.type=='application/vnd.openxmlformats-officedocument.presentationml.presentation'||item.type=='application/pdf'||item.type=='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && item.size<=262144000){
        this.files.push(item);
      }else{
        this.alertpopupService.open({
          message:  `${item.type} is not accept `,
          action: 'ok'
        })
      }

      
    }
    this.updatedFilesDescription.emit(this.files);
  }


  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes:any, decimals?:any) {
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
