import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../user.service';
import { UserSearchCriteria } from '../user-Interface';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { AlertpopupService } from 'src/app/shared/alertPopup/alertpopup.service';
import { OrganizationSearchCriteria } from 'src/app/organization/organization.interface';
import { SearchPipe } from 'src/app/shared/pipes/search.pipe';

@Component({
  selector: 'app-remove-org-pop-up',
  templateUrl: './remove-org-pop-up.component.html',
  styleUrls: ['./remove-org-pop-up.component.css']
})
export class RemoveOrgPopUpComponent implements OnInit {
  selectedUser: any;
  orgnizationsData: any = [];
  dataSource = new MatTableDataSource(this.orgnizationsData);
  selection: any = new SelectionModel(true, []);
  displayedColumns: string[] = ['select', 'Organization','shortName','emailNotification'];
  organizationIDs: string[] = [];

  userPayload: UserSearchCriteria = {
    pageNumber: 0,
    pageSize: 50,
    sortField: "",
    sortOrder: 0,
    type: "",
    isActive: true,
    role: "",
    userId: "",
    user: ""
  }

  constructor(private userService: UserService,
    private alertpopupService: AlertpopupService,
    public dialogref: MatDialogRef<RemoveOrgPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.selectedUser = data
  }

  ngOnInit() {
    this.userSearchCriteria(this.userPayload);
    console.log(this.selection.selected)
  }

  userSearchCriteria(payload: UserSearchCriteria) {
    payload.userId = this.selectedUser._id;
    if (payload.userId) {
      this.userService.userSearchCriteria(payload).subscribe((res) => {
        this.orgnizationsData = res.data.users[0].organizationsdata;
        this.dataSource = new MatTableDataSource(this.orgnizationsData);
      })
    
    }
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

  removeOrganization() {
    this.selection.selected.map((res: any) => {
      this.organizationIDs.push(res._id)
              })

    const payload = {
      userId: this.selectedUser._id,
      organizationIds: this.organizationIDs
        }
    this.userService.removeOrganizationsfromUser(payload).subscribe((res) => {
      this.alertpopupService.open({
        message: 'Organization removed successfully.',
        action: 'ok'
      })
      this.userSearchCriteria(this.userPayload);
    }, (error) => {
      this.alertpopupService.open({
        message: "Faild to remove users from Organization! Please try again ",
        action: 'ok'
      })
    })
  }

  onEmailNotificationChecked(event:any){
    console.log(event);
  }
  
  organisationSearch(event:any){
    if(event.target.value){
      const search = new SearchPipe();
      this.dataSource = new MatTableDataSource(search.transform(this.orgnizationsData,event.target.value,'organization'));
    }else{
      this.dataSource = new MatTableDataSource(this.orgnizationsData);
    }
    
  }

}
