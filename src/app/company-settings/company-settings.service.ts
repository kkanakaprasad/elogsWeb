import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { HttpDataService } from '../shared/services/http-service/http-service.service';
import { NewCategoryPopUpComponent } from './category/new-category-pop-up/new-category-pop-up.component';

@Injectable({
  providedIn: 'root'
})
export class CompanySettingsService {

  constructor(private httpDataService:HttpDataService,  private matDialog:MatDialog ) { }

  getAllOrganizations(): Observable<any>{
    return this.httpDataService.get(`organizations`)
  }

  newCategoryPopup(){
    return this.matDialog.open(NewCategoryPopUpComponent,{disableClose:true,width :'500px',data : "category"})
  }

  getAllActivityTypes(): Observable<any>{
    return this.httpDataService.get(`activity-masterdata/activityType`)
  }
}
