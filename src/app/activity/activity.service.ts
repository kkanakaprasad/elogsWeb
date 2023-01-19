import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpDataService } from '../shared/services/http-service/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private httpDataService: HttpDataService) { }

  getAllActivities(): Observable<any> {
    return this.httpDataService.get('activity')
  }

  getActivitiesMasterData(): Observable<any> {
    return this.httpDataService.get('activity-masterdata')
  }

  createActivity(payload: any): Observable<any> {
    return this.httpDataService.post('activity-type', payload);
  }
 
  postActivity(payload: any): Observable<any> {
    return this.httpDataService.post('activity', payload)
  }

  getActivityMastarData(): Observable<any> {
    return this.httpDataService.get('activity-masterdata');
  }

  getActivityById(activityId: string): Observable<any> {
    return this.httpDataService.get(`activity/${activityId}`)
  }

  updateActivity(activityId: string, payload: any): Observable<any> {
    return this.httpDataService.put(`activity/${activityId}`, payload)
  }

  updateActivityLogById(activityId: string, payload: any): Observable<any> {
    return this.httpDataService.put(`activity/activityLog/${activityId}`, payload)
  }

  updateArchivestatus(activityId: string, payload: any): Observable<any> {
    return this.httpDataService.put(`activity/archive/${activityId}`, payload)
  }

  deleteSelectedActivity(activityId: string): Observable<any> {
    return this.httpDataService.delete(`activity/${activityId}`)
  }
  
  updateActivityStatus(activityId: string, payload: any): Observable<any> {
    return this.httpDataService.put(`activity/update/activityStatus/${activityId}`, payload)
  }
  updateActivityDueDate(activityId:string,payload:any): Observable<any>{
    return this.httpDataService.put(`activity/update/dueDate/${activityId}`,payload)
   }

//dashboard

   postDashBoardActivityMetrics(payload: any): Observable<any> {
    return this.httpDataService.post('activity/dashboard/getDashBoardActivityMetrics', payload);
  }

  getDashBoardDueDateMetrics(): Observable<any> {
    return this.httpDataService.get(`activity/dashboard/getDashBoardDueDateMetrics`)
  }

}
