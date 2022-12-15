import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpDataService } from '../shared/services/http-service/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpdataService: HttpDataService) { }

  getOrganization(surchResult: string): Observable<any> {
    return this.httpdataService.get(`organizations/search?searchString=${surchResult}`);
  }
  addUser(payload: any): Observable<any> {
    return this.httpdataService.post(`user`, payload);
  }

  getUserById(userId:string): Observable<any>{
    return this.httpdataService.get(`user/${userId}`);
  }

}
