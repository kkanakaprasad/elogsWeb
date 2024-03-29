import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { STORAGE_KEYS } from '../enums/storage.enum';
import { StorageService } from '../services/storage-service/storage.service';

@Injectable({
  providedIn : 'root'
})
export class LoginGuard implements CanActivate {
  constructor(public storageService: StorageService,public router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = this.storageService.getDataFromLocalStorage(STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      return true
    }
    this.router.navigate(["home"])
    return true;
  }
  
}
