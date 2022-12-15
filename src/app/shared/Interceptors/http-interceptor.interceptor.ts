import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage-service/storage.service';
import { AlertpopupService } from '../alertPopup/alertpopup.service';
import { RouteConstants } from '../constants/routes.constants';
import { STORAGE_KEYS } from '../enums/storage.enum';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  constructor(
    private storageService: StorageService,
    private alertpopupService: AlertpopupService,
    private router: Router
  ) { }

  handleError = (error: any) => {
    if (error.status === 401) {
      this.alertpopupService.open({
        message: 'UnAuthrized Please login again',
        action: 'ok'
      });
      this.storageService.clearLocalStorage();
      this.router.navigate([RouteConstants.HOME]);
    }
    return throwError(error);
  };

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.storageService.getDataFromLocalStorage(STORAGE_KEYS.ACCESS_TOKEN);

    // if (token) {
    //   request = request.clone({
    //     headers: request.headers.set('Authorization', `Bearer ${token}`)
    //   })
    // }

    return next.handle(request).pipe(
      catchError(this.handleError)
    );
  }
}
