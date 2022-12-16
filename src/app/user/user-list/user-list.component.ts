import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public usersList: any;
  displayedColumns = ['Name','Email','Organization','Actions']
  constructor(private UserService: UserService) { }

  ngOnInit(): void {
    this.getAllUsers()
  }
  getAllUsers() {
   this.UserService.getAllUsers().subscribe((res)=>{
     this.usersList = res.data
   })
  }
}
