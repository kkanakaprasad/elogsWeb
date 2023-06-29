import { Component, OnInit } from '@angular/core';
import { STORAGE_KEYS } from '../shared/enums/storage.enum';
import { StorageService } from '../shared/services/storage-service/storage.service';
import { UserDetailsService } from '../shared/services/user-details-service/user-details.service';
import { UserSearchCriteria } from '../user/user-list/user-Interface';
import { UserService } from '../user/user.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  userDetails: any = {};
  lastLoginTime:any;
  userPayload: UserSearchCriteria = {
    pageNumber: 0,
    pageSize: 10,
    sortField: "",
    sortOrder: 1,
    type: "",
    isActive: true,
    role: "",
    userId: "",
    user: ""
  }

  constructor(private userDetailsService: UserDetailsService,
    private storageService: StorageService,
    private userService : UserService) { }

  ngOnInit(): void {
    this.getUserDetails();
    this.getUserActivity();
  }

  removeOverlay(){
    const bodyElement = document.body;
    bodyElement.classList.remove("toggle_sidebar");
  }

  getUserDetails() {
    const payload: UserSearchCriteria = {
      pageNumber: 0,
      pageSize: 10,
      sortField: '',
      sortOrder: 0,
      type: '',
      role: '',
      userId: this.storageService.getDataFromLocalStorage(STORAGE_KEYS.USER_ID),
      user: ''
    }
    this.userService.userSearchCriteria(payload).subscribe((res: any) => {
      this.userDetails = res.data.users[0];
      this.userDetailsService.setUserDetails(this.userDetails);
    })
  }

  getUserActivity(){
    if(this.storageService.getDataFromLocalStorage(STORAGE_KEYS.USER_ID)){
      this.userService.getUserActivity(this.storageService.getDataFromLocalStorage(STORAGE_KEYS.USER_ID)).subscribe((res : any)=>{
        this.lastLoginTime=res?.updatedAt
      })
    }
  }



}
