import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpDataService } from 'src/app/shared/services/http-service/http-service.service';
import { ChangePassword } from './ChangePassword.Interface';



@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

constructor(private httpDataService: HttpDataService) { }

changePassword(payload:ChangePassword): Observable<any> {
  return this.httpDataService.post(`user/reset/Password`,payload);
}

}
