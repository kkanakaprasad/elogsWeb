import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteConstants } from '../shared/constants/routes.constants';
import { Roles } from '../shared/enums/roles.enums';
import { STORAGE_KEYS } from '../shared/enums/storage.enum';
import { StorageService } from '../shared/services/storage-service/storage.service';
import { UserDetails } from '../shared/services/user-details-service/user-details.interface';
import { UserDetailsService } from '../shared/services/user-details-service/user-details.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  page = 'dashboard';
  logedInRole = ''
  logedinUserDetails : UserDetails = {
    Name: '',
    email: '',
    roles: ['']
  }
  isSuperAdmin : boolean = false;

  constructor(private userDetailsService:UserDetailsService, 
    private storageService:StorageService,
    private router : Router) { }

  ngOnInit(): void {
    this.getLogedInUserDeatils()
    this.isSuperAdmin = this.storageService.getDataFromLocalStorage(STORAGE_KEYS.ROLE) === Roles.SuperAdmin ? true : false;
    this.logedInRole = this.storageService.getDataFromLocalStorage(STORAGE_KEYS.ROLE);
  }

  getLogedInUserDeatils(){
    this.userDetailsService.getUserDetails().subscribe((res)=>{
      this.logedinUserDetails = res;
    })
  }

  navigateToOrganizationList(){
    this.router.navigate([RouteConstants.ORAGANIZATION_LIST])
  }

  naviagteToDashboard(){
    this.router.navigate([RouteConstants.DASHBOARD]);
  }

  naviagteToUserList(){
    this.router.navigate([RouteConstants.USER_LIST]);
  }

  change(name: any) {
    this.page = name;
  }
  navigateToAcitivities(){
    this.router.navigate([RouteConstants.ACTIVITY])
  }
  navigateToActivity(){
    this.router.navigate([RouteConstants.CREATEACTIVITY])
  }

}
