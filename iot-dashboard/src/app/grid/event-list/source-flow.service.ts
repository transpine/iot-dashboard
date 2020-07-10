import { Injectable } from '@angular/core';
import { SourceInterface, EventList } from './source-interface.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Flows {
  // no : number,
  time: string,
  event: string
}

@Injectable({
  providedIn: 'root'
})
export class SourceFlowService implements SourceInterface {
  getEvent$: Observable<EventList[]>;
  eventList : EventList[];

  url = 'http://localhost:3000/flows';

  constructor(public http: HttpClient) {
    const subscribeGetEvents = (observer) => {
      try{
        this.http.get<Flows[]>(this.url)
          .subscribe(flows => observer.next(flows) );
      } catch(e){
        observer.error(e);
      } finally {
        return () => console.log('Unsubscribed');
      }
    }  

    this.getEvent$ = new Observable(subscribeGetEvents);
  }
}