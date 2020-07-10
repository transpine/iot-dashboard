import { Observable } from 'rxjs';

export interface EventList {
    // no : number,
    time: string;
    event: string;
}

export interface SourceInterface{
    getEvent$ : Observable<EventList[]>;
}
