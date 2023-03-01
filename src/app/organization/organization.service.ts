import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { HttpDataService } from '../shared/services/http-service/http-service.service';
import { AddUserPopUpComponent } from './add-user-pop-up/add-user-pop-up.component';
import { CreateOrganizationComponent } from './create-organization/create-organization.component';
import { CreateOrganization } from './organization.interface';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private httpDataService:HttpDataService, private matDialog:MatDialog) { }

  openCreateOrganizatioPopup(){
    return this.matDialog.open(CreateOrganizationComponent,{disableClose:true,width :'500px'})
  }

  getOrganizationType(): Observable<any>{
    return this.httpDataService.get(`organization-type`)
  }
  updateOrganizatioPopup(organizationId:any){
    return this.matDialog.open(CreateOrganizationComponent,{disableClose:true,width :'500px',data : organizationId})
  }
  addusersListOrganizatioPopup(organizationId:any){
    return this.matDialog.open(AddUserPopUpComponent,{disableClose:true,width :'500px',data : organizationId})
  }


  createOrganization(payload : CreateOrganization):Observable<any>{
    return this.httpDataService.post(`organizations`,payload)
  }

  updateOrganization(organizationId:any,payload:any):Observable<any>{
    return this.httpDataService.put(`organizations/${organizationId}`,payload)

  }
  getAllOrganizations(): Observable<any>{
    return this.httpDataService.get(`organizations`)
  }
 
  getOrganizationsSearchCriteria(payload:any): Observable<any>{
    return this.httpDataService.post(`organizations/searchCriteria`,payload)
  }

  getorganizationById(id:any): Observable<any>{
    return this.httpDataService.get(`organizations/${id}`)
  }
  deleteUser(id:string): Observable<any>{
    return this.httpDataService.delete(`organizations/${id}`)
  }
  getUserOrgnationById(organizationId:any): Observable<any>{
    return this.httpDataService.get(`user/organization/${organizationId}`)
  }

  removeUsersfromOrganization(payload:any):Observable<any>{
    return this.httpDataService.put(`user/organization/removeUsersfromOrganization`,payload)

  }


  addUsersToOrganization(payload:any):Observable<any>{
    return this.httpDataService.put(`user/organzation/addUsersToOrganization`,payload)
  }

  
  
}
