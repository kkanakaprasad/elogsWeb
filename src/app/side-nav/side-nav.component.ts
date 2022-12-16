import { Component, OnInit } from '@angular/core';
import { UserDetails } from '../shared/services/user-details-service/user-details.interface';
import { UserDetailsService } from '../shared/services/user-details-service/user-details.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  logedinUserDetails : UserDetails = {
    Name: '',
    email: '',
    roles: ['']
  }
  constructor(private userDetailsService:UserDetailsService) { }

  ngOnInit(): void {
    this.getLogedInUserDeatils()
  }

  getLogedInUserDeatils(){
    this.userDetailsService.getUserDetails().subscribe((res)=>{
      this.logedinUserDetails = res;
    })
  }

}
