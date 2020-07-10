import { Component, OnInit } from '@angular/core';
import { Pageinfo } from '../models/pageinfo.model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatListOption } from '@angular/material/list';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor() { }

  pageInfo : Pageinfo;
  navItems : string[] = ['Flow Checker'];

  ngOnInit(): void {
    this.pageInfo = new Pageinfo("Default Title");
  }

  selectNav(navTitle:string) {
    this.pageInfo = new Pageinfo(navTitle);
  }
}
