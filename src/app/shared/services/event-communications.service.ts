import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class EventCommunicationsService {
    event = new Subject<any>();
    fieldSelected: Subject<any>;

    getEvent() {
        return this.event.asObservable();
    }

    on(eventName : string) {
        return this.getEvent().pipe(
            filter(event => event.name === eventName),
            map(event => event.data)
        );
    }

    broadcast(event : string, data: any) {
         this.event.next({
            name: event,
            data: data
        });
    }

    constructor() {
        this.fieldSelected = new Subject();
    }
}