import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchTriggerService {

  constructor() { }

  private searchTextTrigger : Subject<any> = new Subject();

  public getSearchData():Observable<any>{
    return this.searchTextTrigger.asObservable();
  }

  public setSearchData(searchValue:string){
    this.searchTextTrigger.next(searchValue);
  }
}
