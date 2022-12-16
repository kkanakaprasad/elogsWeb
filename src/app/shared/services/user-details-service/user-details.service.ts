import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { STORAGE_KEYS } from '../../enums/storage.enum';
import { StorageService } from '../storage-service/storage.service';
import { UserDetails } from './user-details.interface';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {


  constructor(private storgeService:StorageService) { }

  userId =  this.storgeService.getDataFromLocalStorage(STORAGE_KEYS.USER_ID);

  private userDetails : BehaviorSubject<any> = new BehaviorSubject({});

  public getUserDetails():Observable<any>{
    return this.userDetails
  }

  public setUserDetails(userDetails:UserDetails){
    this.userDetails.next(userDetails);
  }




}


