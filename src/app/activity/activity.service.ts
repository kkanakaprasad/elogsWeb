import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpDataService } from '../shared/services/http-service/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

constructor(private httpDataService:HttpDataService) { }

getAllActivities(): Observable<any>{
 return this.httpDataService.get('activity')
}

createActivity(payload:any): Observable<any>{
  return this.httpDataService.post('activity-type',payload);
}

postActivity(payload:any):Observable<any>{
  return this.httpDataService.post('activity',payload)
}
}
