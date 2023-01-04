import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { HttpDataService } from '../shared/services/http-service/http-service.service';
import { NewCategoryPopUpComponent } from './category/new-category-pop-up/new-category-pop-up.component';
import { CreateActivityType, UpdateActivityType } from './category/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CompanySettingsService {

  constructor(private httpDataService:HttpDataService,  private matDialog:MatDialog ) { }

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
