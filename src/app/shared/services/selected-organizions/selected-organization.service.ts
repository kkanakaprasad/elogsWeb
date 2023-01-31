import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Roles } from '../../enums/roles.enums';
import { UserDetailsService } from '../user-details-service/user-details.service';


@Injectable({
  providedIn: 'root'
})
export class SelectedOrganizationService {

  constructor(
    private userDetailsService: UserDetailsService,
  ) {
    this.userDetailsService.getUserDetails().subscribe((res: any) => {
        if(res?.roles[0] !== Roles.SuperAdmin){
          this.setSelectedOrganization(res.organization);
        }else{
          this.setSelectedOrganization([]);
        }
    })
  }

  private selectedOrganization: BehaviorSubject<any> = new BehaviorSubject(null);

  public getSelectedOrganization(): Observable<any> {
    return this.selectedOrganization.asObservable();
  }

  public setSelectedOrganization(selectedOrganization: any) {
    this.selectedOrganization.next(selectedOrganization);
  }

}
