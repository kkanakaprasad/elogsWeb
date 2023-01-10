import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ArchiveService } from './archive.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  archiveActivitiesList: any = [];
  taskDisplayedColumns = ['Activity', 'Title', 'Status', 'Organisation'];
  fileDisplayedColumns = ['Activity', 'FileName', 'Size', 'Organization'];
  dataSource = new MatTableDataSource(this.archiveActivitiesList);


  constructor(private archiveService: ArchiveService) { }

  ngOnInit(): void {
    this.getArchiveActivities();
  }

  getArchiveActivities() {
    this.archiveService.getArchiveActivities().subscribe((res) => {
      this.archiveActivitiesList = res.data;
      this.dataSource = new MatTableDataSource(this.archiveActivitiesList);
    
    })
  }
}
