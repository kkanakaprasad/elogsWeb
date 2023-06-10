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
  
  updateUser(userID: string, payload: any): Observable<any> {
    return this.httpdataService.put(`user/${userID}`, payload);
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

  removeOrganizationsfromUser(payload: any): Observable<any> {
    return this.httpdataService.put('user/remove/OrganizationsfromUser', payload);
  }

  getOrganisation(): Observable<any> {
    return this.httpdataService.get('organizations');
  }

  addUsersToOrganizationsfromUser(payload: any): Observable<any> {
    return this.httpdataService.put('user/add/UsersToOrganization', payload);
  }

  getUserActivity(userId : string): Observable<any>{
    return this.httpdataService.get(`user/activity/getuserActivity/${userId}`)
  }
}
