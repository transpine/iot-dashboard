import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export interface Flows {
  // no : number,
  time : string,
  event : string
}

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  flow_url = 'http://localhost:3000/flows';

  dataSource : MatTableDataSource<Flows>;

  // displayedColumns: string[] = ['no', 'time', 'event'];
  displayedColumns: string[] = ['time', 'event'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public http: HttpClient) { }

  ngOnInit(): void {
    this.getList();    
  }

  getList(): void {
    this.http.get<Flows[]>(this.flow_url)
      .subscribe(flows =>{
        this.dataSource = new MatTableDataSource<Flows>(flows);
        this.dataSource.paginator = this.paginator;
      } );
  }

}
