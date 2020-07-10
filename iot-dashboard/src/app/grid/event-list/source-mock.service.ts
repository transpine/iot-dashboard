import { Injectable } from '@angular/core';
import { SourceInterface, EventList } from './source-interface.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SourceMockService implements SourceInterface {
  getEvent$: Observable<EventList[]>;
  eventList : EventList[];

  constructor() {
    const subscribeGetEvents = (observer) => {
      try{
        this.eventList  = [
            {time : "2020.01.01/12:12:12", event : "sit" },
            {time : "2020.01.01/12:12:12", event : "sit" },
            {time : "2020.01.01/12:12:12", event : "sit" },
        ];
        observer.next(this.eventList);
      } catch(e){
        observer.error(e);
      } finally {
        return () => console.log('Unsubscribed');
      }
    }  

    this.getEvent$ = new Observable(subscribeGetEvents);
  }
}
