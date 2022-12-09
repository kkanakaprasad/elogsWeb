import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  constructor(
    private storageService: StorageService,

    private router: Router
  ) {}

  handleError = (error: any) => {
    if (error.status === 401) {
      // this.toastrService.error('UnAuthrized Please login again');
      this.router.navigate(['/login-page']);
    }
    return throwError(error);
  };

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request);
  }
}
