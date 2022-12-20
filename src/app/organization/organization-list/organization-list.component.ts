import { Component, OnInit } from '@angular/core';
import { FILTER_CONSTANT } from 'src/app/shared/constants/filter.constants';
import { MasterDataService } from 'src/app/shared/services/master-data/master-data.service';
import { AddNewUserService } from 'src/app/user/add-new-user/add-new-user.service';
import { OrganizationSearchCriteria } from '../organization.interface';
import { OrganizationService } from '../organization.service';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit {
  organizationList: any;
  filters = FILTER_CONSTANT;
  organizationListPayload :OrganizationSearchCriteria  = {
    pageNumber: 0,
    pageSize: 50,
    sortField: "",
    sortOrder: 0,
    type: "",
    organization: "",
    isActive: true
  }
  organizationTypes :any;

  constructor(private organizationService: OrganizationService,
    private masterDataService: MasterDataService,
    private addNewUserService: AddNewUserService,) { }


  ngOnInit(): void {
    this.getAllOrganizationsSearchCriteria(this.organizationListPayload)
    this.getOrganizationTypes()
  }
  
  getOrganizationTypes() {
    this.masterDataService.getOrganizationTypes().subscribe((res) => {
      this.organizationTypes = res.data;
      console.log(this.organizationTypes);
      
    })
  }

  getAllOrganizationsSearchCriteria(payload : OrganizationSearchCriteria) {
    this.organizationService.getOrganizationsSearchCriteria(payload).subscribe((res) => {
      this.organizationList = res.organizations[0].organizations.reverse();
      // console.log(this.organizationList.id)
    })
   
  }

  applyOrganizationFilters(type:number){
    let updatedPayload = this.organizationListPayload;
    if(FILTER_CONSTANT.MINISTRIES === type){
      updatedPayload = {
        ...updatedPayload,
        type : this.organizationTypes[FILTER_CONSTANT.MINISTRIES]._id
      }
    }else if(FILTER_CONSTANT.IS_ACTIVE === type){
      updatedPayload = {
        ...updatedPayload,
        isActive : true
      }
    }else if(FILTER_CONSTANT.ASSOCIATION === type){
      updatedPayload = {
        ...updatedPayload,
        type : this.organizationTypes[FILTER_CONSTANT.ASSOCIATION]._id
      }
    }else if(FILTER_CONSTANT.INACTIVE === type){
      updatedPayload = {
        ...updatedPayload,
        isActive : false
      }
    }

    this.getAllOrganizationsSearchCriteria(updatedPayload);
  }

  updateOrganizationList(organizationId:string){
    this.organizationService.updateOrganizatioPopup(organizationId)
    // console.log(organizationId)
  }

  addOrganizationList() {

    this.organizationService.openCreateOrganizatioPopup().afterClosed().subscribe((res) => {
      if (res) {
        this.getAllOrganizationsSearchCriteria(this.organizationListPayload)
       
      }
    })
  }
  addUser(){
    this.addNewUserService.openAddUser().afterClosed().subscribe((res)=>{
      if(res){
        this.getAllOrganizationsSearchCriteria(this.organizationListPayload)
      }
    })
  }
  

}
