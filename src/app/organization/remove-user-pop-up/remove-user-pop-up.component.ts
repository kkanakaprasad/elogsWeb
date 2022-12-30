import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, Inject } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AlertpopupService } from 'src/app/shared/alertPopup/alertpopup.service';
import { OrganizationSearchCriteria } from '../organization.interface';
import { OrganizationService } from '../organization.service';

@Component({
  selector: 'app-remove-user-pop-up',
  templateUrl: './remove-user-pop-up.component.html',
  styleUrls: ['./remove-user-pop-up.component.scss']
})
export class RemoveUserPopUpComponent implements OnInit {
  selectedOrganizationId: string = '';
  organizationUsersData: any=[];
  displayedColumns: string[] = ['select', 'Name', 'Email','Email Notification'];
  dataSource = new MatTableDataSource(this.organizationUsersData);
  tableRowSelection: any = new SelectionModel(true, []);
  userIds:any;
  userIdsArray:string[]=[]
  organizationName: any;
  color: ThemePalette = 'accent';
  isEmailNotificationActive= false;
  disabled = false;

  constructor(private alertpopupService:AlertpopupService,
    private organizationService: OrganizationService,
    public dialogref: MatDialogRef<RemoveUserPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.selectedOrganizationId = data
  }

  ngOnInit(): void {
    this.getUsersOrgnationById()

  }

  getUsersOrgnationById() {
    const payload: OrganizationSearchCriteria = {
      pageNumber: 1000,
      pageSize: 0,
      sortField: '',
      sortOrder: 0,
      type: '',
      organization: '',
      organizationId: this.selectedOrganizationId,
      userId: '',
      userSearch: ""
    }
    this.organizationService.getOrganizationsSearchCriteria(payload).subscribe((res: any) => {

      this.organizationName= res.organizations[0].organizations[0].organization
      this.organizationUsersData = res.organizations[0].organizations[0].users
      console.log(this.organizationUsersData);
      this.dataSource = new MatTableDataSource(this.organizationUsersData);

    })
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.tableRowSelection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.tableRowSelection.clear();
      return;
    }

    this.tableRowSelection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.tableRowSelection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  
  userSearch(event:any){
    console.log(event.target.value)
    const payload: OrganizationSearchCriteria = {
      pageNumber: 1000,
      pageSize: 0,
      sortField: '',
      sortOrder: 0,
      type: '',
      organization: '',
      organizationId: this.selectedOrganizationId,
      userId: '',
      userSearch: event.target.value
    }
    this.organizationService.getOrganizationsSearchCriteria(payload).subscribe((res: any) => {

      this.organizationName= res.organizations[0].organizations[0].organization
      this.organizationUsersData = res.organizations[0].organizations[0].users
      // console.log(this.organizationUsersData)
      })

  }
  selectedUsers(){
    console.log(this.tableRowSelection.selected);
    this.tableRowSelection.selected.map((res:any)=>{
      this.userIdsArray.push(res._id)
      console.log(this.userIdsArray)
    })
    
    const payload={
      userIds:this.userIdsArray,
      organizationId:this.selectedOrganizationId
    }
    this.organizationService.removeUsersfromOrganization(payload).subscribe(res=>{
      res
      this.alertpopupService.open({
        message: res.message,
        action: 'ok'
      })
      
    }
      , (error) => {
        this.alertpopupService.open({
          message: "Faild to remove users from Organization! Please try again ",
          action: 'ok'
        })
    })
  }

  onEmailNotificationChecked(event:any){
    console.log(event);
  }
}
