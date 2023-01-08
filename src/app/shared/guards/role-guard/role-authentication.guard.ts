import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertpopupService } from '../../alertPopup/alertpopup.service';
import { RouteConstants } from '../../constants/routes.constants';
import { STORAGE_KEYS } from '../../enums/storage.enum';
import { StorageService } from '../../services/storage-service/storage.service';


@Injectable({
  providedIn: 'root'
})
export class RoleAuthenticationGuard implements CanActivateChild {
  constructor(private storageService: StorageService, private router: Router,private alertPopupService: AlertpopupService) { }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const loggedInRole = this.storageService.getDataFromLocalStorage(STORAGE_KEYS.ROLE)
    if (loggedInRole) {
      const roleIndex = route.data['roles'].indexOf(loggedInRole)
      if (roleIndex !== -1) {
        return true;
      }
    }
    this.alertPopupService.open({
      message : 'Access Denied!!',
      action : 'ok'
    });
    this.router.navigate([RouteConstants.DASHBOARD]);
    return false;
  }

}
