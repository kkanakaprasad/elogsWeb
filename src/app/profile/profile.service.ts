import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { HttpDataService } from '../shared/services/http-service/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpDataService: HttpDataService) { }

  getUserById(userID:string): Observable<any> {
    return this.httpDataService.get(`user/${userID}`)
  }

  createProfile(payload:any):Observable<any>{
    return this.httpDataService.post(`profile`,payload);
  }
  
  updateProfile(profileId:string,payload:any):Observable<any>{
    return this.httpDataService.put(`profile/${profileId}`,payload);
  }

  getProfileByUserId(userId:string) : Observable<any>{
    return this.httpDataService.get(`profile/userId/${userId}`);
  }

}
