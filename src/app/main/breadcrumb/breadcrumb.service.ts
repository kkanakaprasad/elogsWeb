import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  constructor() { }

  private selectedActivityStatus : BehaviorSubject<any> = new BehaviorSubject({});

  public getSelectedActivitiesStatus():Observable<any>{
    return this.selectedActivityStatus
  }

  public setSelectedActivityStatus(selectedActivitiesStatus:any){
    this.selectedActivityStatus.next(selectedActivitiesStatus);
  }

}
