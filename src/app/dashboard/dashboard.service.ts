import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpDataService } from '../shared/services/http-service/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  constructor(private httpDataService:HttpDataService) { }

  postDashBoardActivityMetrics(payload: any): Observable<any> {
    return this.httpDataService.post('activity/dashboard/getDashBoardActivityMetrics', payload);
  }

  postDashBoardDueDateMetrics(payload:any): Observable<any> {
    return this.httpDataService.post(`activity/dashboard/getDashBoardDueDateMetrics`,payload)
  }

  postDashBoardRelatedToMetrics(payload:any): Observable<any> {
    return this.httpDataService.post(`activity/dashboard/getDashBoardRelatedToMetricsMetrics`,payload)
  }

  getUserMetricsForDashBoard(): Observable<any> {
    return this.httpDataService.get(`user/dashboard/getUserMetrics`)
  }

  getOrganizationsMetricsForDashBoard(): Observable<any> {
    return this.httpDataService.get(`organizations/dashboard/metrics`)
  }
}
