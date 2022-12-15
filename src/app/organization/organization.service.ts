import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { HttpDataService } from '../shared/services/http-service/http-service.service';
import { CreateOrganizationComponent } from './create-organization/create-organization.component';
import { CreateOrganization } from './organization.interface';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private httpDataService:HttpDataService, private matDialog:MatDialog) { }

  openCreateOrganizatioPopup(){
    this.matDialog.open(CreateOrganizationComponent,{disableClose:true,width :'500px'})
  }

  createOrganization(payload : CreateOrganization):Observable<any>{
    return this.httpDataService.post(`organizations`,payload)
  }
  getAllOrganizations(): Observable<any>{
    return this.httpDataService.get(`organizations`)
  }
  
}
