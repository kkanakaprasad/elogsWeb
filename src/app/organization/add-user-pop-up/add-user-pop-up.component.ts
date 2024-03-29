import { Component, Inject, OnInit } from '@angular/core';
import { AddNewUserService } from 'src/app/user/add-new-user/add-new-user.service';
import { UserService } from 'src/app/user/user.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { filter, map } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrganizationService } from '../organization.service';
import { OrganizationSearchCriteria } from '../organization.interface';
import { AlertpopupService } from 'src/app/shared/alertPopup/alertpopup.service';
import { SearchPipe } from 'src/app/shared/pipes/search.pipe';

@Component({
  selector: 'app-add-user-pop-up',
  templateUrl: './add-user-pop-up.component.html',
  styleUrls: ['./add-user-pop-up.component.scss']
})
export class AddUserPopUpComponent implements OnInit {
  selectedOrganizationId: string = "";
  addUserData: any;
  unAssignedUsersData: any = [];
  displayedColumns: string[] = ['select', 'Name', 'Email'];
  dataSource = new MatTableDataSource(this.unAssignedUsersData);
  selection: any = new SelectionModel(true, []);
  organizationUsersData: []=[];
  displayedColumnsUsers: string[] = ['User'];
  usersToSelectedOrganization:string[]=[];
  dataSourceUsers = new MatTableDataSource(this.organizationUsersData);
  organizationName: any;
  organizationList: any;


  constructor(private addNewUserService: AddNewUserService,
    private userService: UserService,
    private alertpopupService:AlertpopupService,
    private organizationService: OrganizationService,
    public dialogref: MatDialogRef<AddUserPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.selectedOrganizationId = data
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.getUsersOrgnationById();
  }
  addUser() {
    this.addNewUserService.openAddUser();
  }

  getAllUsers() {

    this.userService.getAllUsers().pipe(map(res => {
      return res.data.filter((user: any) => {
        return !user.organization || user.organization.length === 0;
      });
    })).subscribe(res => {
      this.unAssignedUsersData = res;
      this.dataSource = new MatTableDataSource(this.unAssignedUsersData);
    })

  }
  
  userSearch(event:any){
    if(event.target.value){
      const search = new SearchPipe();
      this.dataSource = new MatTableDataSource(search.transform(this.unAssignedUsersData,event.target.value,'Name'));
    }else{
      this.dataSource = new MatTableDataSource(this.unAssignedUsersData);
    }
    
    }
    
  

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  getAllOrganizationsSearchCriteria(payload: OrganizationSearchCriteria) {
    this.organizationService.getOrganizationsSearchCriteria(payload).subscribe((res) => {
      this.organizationList = res.data.organizations[0].organizations.reverse();
    })
  }
  
  //remove users logic for X mark 

  removeUserFromOrganization(userId:string){
    const payload={
      userId:userId,
      organizationIds:this.selectedOrganizationId
    }
    this.organizationService.removeUsersfromOrganization(payload).subscribe(res=>{
    })
  }

  getUsersOrgnationById() {
    const payload : OrganizationSearchCriteria = {
      pageNumber: 10000,
      pageSize: 0,
      sortField: '',
      sortOrder: 0,
      type: '',
      organization: '',
      organizationId: this.selectedOrganizationId,
      userId: '',
      userSearch: ""
    }
    this.organizationService.getOrganizationsSearchCriteria(payload).subscribe((res:any)=>{
      this.organizationName=res.data.organizations[0].organization
      this.organizationUsersData = res.data.organizations[0].users
      this.dataSourceUsers = new MatTableDataSource( this.organizationUsersData);
    })
  }

  selectedUsers(){
    this.selection.selected.map((res:any)=>{
     this.usersToSelectedOrganization.push(res._id)
    })
    const payload={
      userIds: this.usersToSelectedOrganization ,
      organizationId: this.selectedOrganizationId
    }
    this.organizationService.addUsersToOrganization(payload).subscribe(res=>{
      res
      this.alertpopupService.open({
        message: res.message,
        action: 'ok'
      })
    
    }
      , (error) => {
        this.alertpopupService.open({
          message: "Faild to add users to Organization! Please try again ",
          action: 'ok'
        })
    })
  }


}

