import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpDataService } from '../shared/services/http-service/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpdataService: HttpDataService) { }

  getOrganization(suchResult: string): Observable<any> {
    return this.httpdataService.get(`organizations/search?searchString=${suchResult}`);
  }
  addUser(payload: any): Observable<any> {
    return this.httpdataService.post(`user`, payload);
  }

}
