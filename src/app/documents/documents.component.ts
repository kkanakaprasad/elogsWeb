import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  displayedColumns = ['Activity', 'FileName', 'Size', 'Organization']
  dataSource = new MatTableDataSource();

  constructor() { }

  ngOnInit(): void {
  }

}
