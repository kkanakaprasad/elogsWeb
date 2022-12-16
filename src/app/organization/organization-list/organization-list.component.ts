import { Component, OnInit } from '@angular/core';
import { HttpDataService } from 'src/app/shared/services/http-service/http-service.service';
import { AddNewUserService } from 'src/app/user/add-new-user/add-new-user.service';
import { OrganizationService } from '../organization.service';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit {
  organizationList: any;

  constructor(private organizationService:OrganizationService,
    private addNewUserService:AddNewUserService) { }


  ngOnInit(): void {
    this.getAllOrganizationsSearchCriteria()
  }

  getAllOrganizationsSearchCriteria(){
    const payload={
      pageNumber: 0,
      pageSize: 50,
      sortField: "",
      sortOrder: 0,
      type: "",
      organization: ""
    }
    this.organizationService.getOrganizationsSearchCriteria(payload).subscribe((res)=>{
      this.organizationList=res.organizations[0].organizations.reverse();
      console.log(this.organizationList)
    })
    
  }

  addOrganizationList(){
    this.organizationService.openCreateOrganizatioPopup().afterClosed().subscribe((res)=>{
      if(res){
        this.getAllOrganizationsSearchCriteria()
      }
    })
  }
  addUser(){
    this.addNewUserService.openAddUser().afterClosed().subscribe((res)=>{
      if(res){
        this.getAllOrganizationsSearchCriteria()
      }
    })
  }

}
