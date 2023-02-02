import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent {

  displayedColumns = ['Activity', 'FileName', 'Size', 'Organisation']
  dataSource = new MatTableDataSource();

  constructor() { }

}
