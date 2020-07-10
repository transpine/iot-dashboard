import { Component, OnInit, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { Pageinfo } from '../models/pageinfo.model';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  @Input() pageInfo : Pageinfo;

  constructor(private breakpointObserver: BreakpointObserver) {}
  cards$: Observable<Object>;

  ngOnInit(): void {
    /** Based on the screen size, switch from standard to one column per row */
    this.cards$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        if (matches) {
          return [
            { title: 'Card 1', cols: 1, rows: 1 },
            // { title: 'Card 2', cols: 1, rows: 1 },
            // { title: 'Card 3', cols: 1, rows: 1 },
            // { title: 'Card 4', cols: 1, rows: 1 }
          ];
        }

        return [
          { title: 'Card 1', cols: 2, rows: 1 },
          // { title: 'Card 2', cols: 1, rows: 1 },
          // { title: 'Card 3', cols: 1, rows: 2 },
          // { title: 'Card 4', cols: 1, rows: 1 }
        ];
      })
    );
  }

}
