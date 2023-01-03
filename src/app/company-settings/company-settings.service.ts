import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpDataService } from '../shared/services/http-service/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class CompanySettingsService {

  constructor(private httpDataService:HttpDataService) { }

  getAllOrganizations(): Observable<any>{
    return this.httpDataService.get(`organizations`)
  }
}
