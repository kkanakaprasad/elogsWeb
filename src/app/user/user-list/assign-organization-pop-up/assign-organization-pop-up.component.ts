import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../user.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrganizationService } from 'src/app/organization/organization.service';
import { AlertpopupService } from 'src/app/shared/alertPopup/alertpopup.service';
import { SearchPipe } from 'src/app/shared/pipes/search.pipe';

@Component({
  selector: 'app-assign-organization-pop-up',
  templateUrl: './assign-organization-pop-up.component.html',
  styleUrls: ['./assign-organization-pop-up.component.scss']
})
export class AssignOrganizationPopUpComponent implements OnInit {
  organizations: any = [];
  displayedColumns = ['select', 'organization', 'shortName']
  displayedOrgColumns: string[] = ['organization'];
  selection: any = new SelectionModel(true, []);
  dataSource = new MatTableDataSource(this.organizations);
  selectedUser: any;
  assignOrgs: any = [];

  constructor(private userService: UserService,
    private organizationService: OrganizationService,
    private alertpopupService: AlertpopupService,
    public dialogref: MatDialogRef<AssignOrganizationPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {
    this.selectedUser = data
  }

  ngOnInit() {
    this.getOrganizations();
  }

  getOrganizations() {
    this.userService.getOrganisation().subscribe((res) => {
      // console.log(res.organizations)
      this.organizations = res.organizations;
      this.dataSource = new MatTableDataSource(this.organizations);
    })
  }

  addOrganisation() {
    this.organizationService.openCreateOrganizatioPopup().afterClosed().subscribe((res) => {
      console.log(res);
    })
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  assignProjects() {
    if (this.selection._selected.length > 0) {
      this.assignOrgs = [];
      this.selection._selected.forEach((item: any) => {
        this.assignOrgs.push({
          id: item._id,
          organization: item.organization
        })
             });
      this.getOrganizations();
    }
      }

  assign() {
    var organizationIDs: any = [];
    this.selection.selected.map((res: any) => {
      organizationIDs.push(res._id)
    })
    const payload = {
      userId: this.selectedUser._id,
      organizationIds: organizationIDs
    }
    this.userService.addUsersToOrganizationsfromUser(payload).subscribe((res) => {
      if(res.success){
        this.alertpopupService.open({
          message: 'Organization(s) assigned successfully.',
          action: 'ok'
        })
        this.getOrganizations();
      }
  
      // this.userSearchCriteria(this.userPayload);
    }, (error) => {
      this.alertpopupService.open({
        message: "Faild to assign Organization(s)! Please try again ",
        action: 'ok'
      })
    })

    // this.userService.addUsersToOrganizationsfromUser()
  }

  organisationSearch(event:any){
    if(event.target.value){
      const search = new SearchPipe();
      this.dataSource = new MatTableDataSource(search.transform(this.organizations,event.target.value,'organization'));
    }else{
      this.dataSource = new MatTableDataSource(this.organizations);
    }

  }
}
