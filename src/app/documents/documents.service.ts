import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpDataService } from '../shared/services/http-service/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService  {

  constructor(private httpDataService:HttpDataService) { }
  postActivityAttachments(payload:any): Observable<any> {
    return this.httpDataService.post('activity/getAttchements', payload)
  }

}
