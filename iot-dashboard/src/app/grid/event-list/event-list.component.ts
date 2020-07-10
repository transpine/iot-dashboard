import { Component, OnInit, OnChanges, ViewChild, Input, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SourceInterface, EventList } from './source-interface.model';
import {SourceMockService} from './source-mock.service';
import {SourceFlowService} from './source-flow.service';

import { Pageinfo } from 'src/app/models/pageinfo.model';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnChanges {

  dataSource: MatTableDataSource<EventList>;
  source: SourceInterface;

  // displayedColumns: string[] = ['no', 'time', 'event'];
  displayedColumns: string[] = ['time', 'event'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() pageInfo : Pageinfo;

  constructor(
    public sourceMock : SourceMockService,
    public sourceFlow : SourceFlowService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges');
    if( this.pageInfo.title === "Flow Checker"){
      this.source = this.sourceFlow;
    } else {
      this.source = this.sourceMock;
    }

    this.source.getEvent$.subscribe(
      eventList => {
        this.dataSource = new MatTableDataSource<EventList>(eventList);
        this.dataSource.paginator = this.paginator;
      });

  }

  ngOnInit(): void {}
}
