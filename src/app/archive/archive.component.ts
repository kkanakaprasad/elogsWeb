import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  taskDisplayedColumns = ['Activity','Tittle','Status','Organisation']
   fileDisplayedColumns = ['Activity', 'FileName', 'Size', 'Organization']
  dataSource = new MatTableDataSource();
  
 

  constructor() { }

  ngOnInit(): void {
  }
  
}
