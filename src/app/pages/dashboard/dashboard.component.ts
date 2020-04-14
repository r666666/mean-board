import { Component, OnInit } from '@angular/core';

import { BasePageComponent } from '../base-page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class PageDashboardComponent extends BasePageComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
