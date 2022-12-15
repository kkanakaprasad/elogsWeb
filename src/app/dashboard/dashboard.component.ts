import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateOrganizationComponent } from '../organization/create-organization/create-organization.component';
import { OrganizationService } from '../organization/organization.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private matDialog: MatDialog, private organizationService:OrganizationService) { }

  ngOnInit(): void {
  }

  createOrganization(){
    this.organizationService.openCreateOrganizatioPopup();
  }

}
