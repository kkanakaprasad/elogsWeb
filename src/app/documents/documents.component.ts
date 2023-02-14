import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationProps } from '../shared/constants/pagination';
import { DocumentsService } from './documents.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit,AfterViewInit{
  totalUserCount: number = 0;
  paginationProps = PaginationProps;
  attachmentsDetails: any=[];
  documentsPayload:any={
    pageNumber: 0,
     pageSize: 10,
     sortField: "",
     groupBy: 0,
     fileNameSearchText: ""
  }
  displayedColumns = ['Activity', 'FileName', 'Size', 'Organisation']
  dataSource = new MatTableDataSource(this.attachmentsDetails);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  totalDocumentCount: any;
  

  constructor(private documentsService: DocumentsService) { 

  }
  ngOnInit(): void {
    this.postActivityAttachments()
    
  }
  postActivityAttachments(){
    this.documentsService.postActivityAttachments(this.documentsPayload).subscribe(res=>{
      this.attachmentsDetails=res?.data[0]?.attachments
      this.totalDocumentCount=res?.data[0]?.count[0]?.count
      this.dataSource = new MatTableDataSource(this.attachmentsDetails)
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
}
