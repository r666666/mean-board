import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateLayoutComponent implements OnInit {
  sidebarState: boolean;
  pageTitle: string;
  noPadding: boolean;

  constructor() {}

  ngOnInit() {
  }
}
