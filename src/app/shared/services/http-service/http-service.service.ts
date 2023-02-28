import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {

  loadingCount = 0;
  constructor(
    public httpClient :HttpClient
  ) { }

  post(url : string, payload:any,options?:any){
    this.loadingCount = this.loadingCount+1;
    if (url) {
      return this.httpClient.post(`${environment.BASE_URL}${url}`,payload,options).pipe(
        finalize(()=>{
          this.loadingCount = this.loadingCount -1;
        })
      );
    } else {
      return of(null);
    }
  }

  get(endpoint : any) {
    this.loadingCount = this.loadingCount+1;
    if (endpoint) {
      return this.httpClient.get(`${environment.BASE_URL}${endpoint}`).pipe(
        finalize(()=>{
          this.loadingCount = this.loadingCount -1;
        })
      );;
    } else {
      return of(null);
    }
  }

  put(url : string, payload:any){
    this.loadingCount = this.loadingCount+1;
    if (url) {
      return this.httpClient.put(`${environment.BASE_URL}${url}`,payload).pipe(
        finalize(()=>{
          this.loadingCount = this.loadingCount -1;
        })
      );;
    } else {
      return of(null);
    }
  }

  delete(url : string){
    this.loadingCount = this.loadingCount+1;
    if (url) {
      return this.httpClient.delete(`${environment?.BASE_URL}${url}`).pipe(
        finalize(()=>{
          this.loadingCount = this.loadingCount -1;
        })
      );;
    } else {
      return of(null);
    }
  }
}
