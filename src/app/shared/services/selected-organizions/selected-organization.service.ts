import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SelectedOrganizationService {

  constructor() { }

  private selectedOrganization : BehaviorSubject<any> = new BehaviorSubject([]);

  public getSelectedOrganization():Observable<any>{
    return this.selectedOrganization
  }

  public setSelectedOrganization(selectedOrganization:any){
    this.selectedOrganization.next(selectedOrganization);
  }

}
