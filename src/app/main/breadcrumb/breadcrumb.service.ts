import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  constructor() { }

  private selectedActivityStatus : Subject<any> = new Subject();

  public getSelectedActivitiesStatus():Observable<any>{
    return this.selectedActivityStatus.asObservable();
  }

  public setSelectedActivityStatus(selectedActivitiesStatus:any){
    this.selectedActivityStatus.next(selectedActivitiesStatus);
  }

}
