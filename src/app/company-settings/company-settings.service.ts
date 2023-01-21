import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpDataService } from '../shared/services/http-service/http-service.service';
import { NewCategoryPopUpComponent } from './category/new-category-pop-up/new-category-pop-up.component';
import { CreateActivityType, UpdateActivityType } from './category/category.interface';
import { ExportsTasksComponent } from './import-export/exports-tasks/exports-tasks.component';

@Injectable({
  providedIn: 'root'
})
export class CompanySettingsService {

  private selectedOrganization : BehaviorSubject<any> = new BehaviorSubject({});

  constructor(private httpDataService:HttpDataService,  private matDialog:MatDialog ) { }

  createCompanySettings(payload: any): Observable<any> {
    return this.httpDataService.post(`companySettings`, payload);
  }
  
  updateCompanySettings(companySettingsId: string, payload: any): Observable<any> {
    return this.httpDataService.put(`companySettings/${companySettingsId}`, payload);
  }

  getCompanySettings(): Observable<any> {
    return this.httpDataService.get('companySettings');
  }

  getAllOrganizations(): Observable<any>{
    return this.httpDataService.get(`organizations`)
  }

  updateCategoryPopup(activityTypeData: any){
    return this.matDialog.open(NewCategoryPopUpComponent,{
      disableClose:true,width :'500px',data : {...activityTypeData, mode: "üpdate"}})
  }

  createCategoryPopup(){
    return this.matDialog.open(NewCategoryPopUpComponent,
      {disableClose:true,width :'500px',data : {mode: "create"}})
  }

  exportTasksPopup(){
    return this.matDialog.open(ExportsTasksComponent,
      {disableClose:true,width :'500px',data : ''})
  }


  getAllActivityTypes(): Observable<any>{
    return this.httpDataService.get(`activity-masterdata/activityType`)
  }

  updateActivtyType (activityTypeId: any, payload: UpdateActivityType):Observable<any> {
    return this.httpDataService.put(`activity-masterdata/update/activityType/${activityTypeId}`, payload)
  }

  createActivtyType ( payload: CreateActivityType):Observable<any> {
    return this.httpDataService.post(`activity-masterdata/create/activityType`, payload)
  }
}
