import { Injectable } from '@angular/core';
import { HttpDataService } from '../shared/services/http-service/http-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public httpDataService : HttpDataService) { }
  login(loginDetails: {
    email: string,
    password: string
  }): Observable<any> {
    return this.httpDataService.post(`auth/login`,loginDetails);
  }

}

