import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpDataService } from '../http-service/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {

  constructor(private httpDataService: HttpDataService) { }

  getOrganizationTypes():Observable<any>{
    return this.httpDataService.get(`organization-type`);
  }
}
