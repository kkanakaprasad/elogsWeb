import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  httpDataService: any;

  constructor() { }

  postDashBoardActivityMetrics(payload: any): Observable<any> {
    return this.httpDataService.post('activity/dashboard/getDashBoardActivityMetrics', payload);
  }

  getDashBoardDueDateMetrics(): Observable<any> {
    return this.httpDataService.get(`activity/dashboard/getDashBoardDueDateMetrics`)
  }

  getDashBoardRelatedToMetrics(): Observable<any> {
    return this.httpDataService.get(`activity/dashboard/getDashBoardRelatedToMetricsMetrics`)
  }

  getUserMetricsForDashBoard(): Observable<any> {
    return this.httpDataService.get(`user/dashboard/getUserMetrics`)
  }

  getOrganizationsMetricsForDashBoard(): Observable<any> {
    return this.httpDataService.get(`organizations/dashboard/metrics`)
  }
}
