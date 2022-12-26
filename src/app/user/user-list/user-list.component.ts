import { Component, OnInit } from '@angular/core';
import { UpdateProfileSearchCriteria } from 'src/app/profile/profile.interface';
import { ProfileService } from 'src/app/profile/profile.service';
import { FILTER_CONSTANT } from 'src/app/shared/constants/filter.constants';
import { StorageService } from 'src/app/shared/services/storage-service/storage.service';
import { AddNewUserService } from '../add-new-user/add-new-user.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public usersList: any;
  public allusersList: any;
  filters = FILTER_CONSTANT
  userTypes: any;
  userPayload: UpdateProfileSearchCriteria = {
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
  displayedColumns = ['Name', 'Email', 'Organization', 'Actions']
  constructor(private UserService: UserService,
    private addNewUserService: AddNewUserService,
    private profileService: ProfileService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.getAllUsers()
  }
  getAllUsers() {
    this.UserService.getAllUsers().subscribe((res) => {
      this.allusersList = res.data;
      this.usersList = res.data;
    })
  }
 
  openAddUser() {
    this.addNewUserService.openAddUser();
  }

  updateUserDetails(payload: UpdateProfileSearchCriteria) {

    this.profileService.getUsersBySearchCriteria(payload).subscribe((res) => {
      this.usersList = res.users[0].users
      console.log(res)
    })
  }
  applyUserFilters(e: any) {
    if (Number(e.tab.textLabel) === FILTER_CONSTANT.IS_ACTIVE) {
      this.usersList = this.allusersList.filter((x: any) => x.isActive === true)
    }
    else if (Number(e.tab.textLabel) === FILTER_CONSTANT.MY_PROFILE) {
      var userId = this.storageService.getDataFromLocalStorage('user_id');
      this.usersList = this.allusersList.filter((x: any) => x._id === userId)
    }
    else if (Number(e.tab.textLabel) === FILTER_CONSTANT.INACTIVE) {
      this.usersList = this.allusersList.filter((x: any) => x.isActive === false)
    }
    else if (Number(e.tab.textLabel) === FILTER_CONSTANT.MINISTRIES) {
      this.userPayload.type = '63973bfb61ab6f49bfdd3c35'
      this.updateUserDetails(this.userPayload);
       this.usersList = this.allusersList.filter((x: any) => x.isActive === false)
    }
    else if (Number(e.tab.textLabel) === FILTER_CONSTANT.ASSOCIATION) {
   
      this.userPayload.type = '63973c8961ab6f49bfdd3c38'
      this.updateUserDetails(this.userPayload);
       this.usersList = this.allusersList.filter((x: any) => x.isActive === false)
    }
  }


}
