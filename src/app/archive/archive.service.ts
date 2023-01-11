import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpDataService } from '../shared/services/http-service/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  constructor(private httpDataService:HttpDataService) { }

  getArchiveActivities(): Observable<any>{
    return this.httpDataService.get(`activity/archive/activities`)
  }
}
