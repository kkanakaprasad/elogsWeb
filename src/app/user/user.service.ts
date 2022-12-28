import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { HttpDataService } from '../shared/services/http-service/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpdataService: HttpDataService,
    private matDialog: MatDialog
  ) { }

  getOrganization(surchResult: string): Observable<any> {
    return this.httpdataService.get(`organizations/search?searchString=${surchResult}`);
  }
  addUser(payload: any): Observable<any> {
    return this.httpdataService.post(`user`, payload);
  }

  getUserById(userId: string): Observable<any> {
    return this.httpdataService.get(`user/${userId}`);
  }

  getAllUsers(): Observable<any> {
    return this.httpdataService.get('user');
  }

  applyUserFilters(): Observable<any> {
    return this.httpdataService.get('organization-type');
  }
  
  userSearchCriteria(payload: any): Observable<any> {
    return this.httpdataService.post('user/searchCriteria', payload);
  }
}
