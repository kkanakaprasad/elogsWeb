import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { STORAGE_KEYS } from '../../enums/storage.enum';
import { StorageService } from '../storage-service/storage.service';
import { UserDetails } from './user-details.interface';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  constructor(private storgeService: StorageService) {}

  userId = this.storgeService.getDataFromLocalStorage(STORAGE_KEYS.USER_ID);

  private userDetails: BehaviorSubject<any> = new BehaviorSubject(this.storgeService.getDataFromLocalStorage(STORAGE_KEYS.ACCESS_TOKEN) ? jwtDecode(this.storgeService.getDataFromLocalStorage(STORAGE_KEYS.ACCESS_TOKEN)) : {});

  public getUserDetails(): Observable<any> {
    return this.userDetails
  }

  public setUserDetails(userDetails: UserDetails) {
    this.userDetails.next(userDetails);
  }




}


