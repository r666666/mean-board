import { Component, OnInit } from '@angular/core';

import { BaseLayoutComponent } from '../base-layout/base-layout.component';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: [
    '../base-layout/base-layout.component.scss',
    './public.component.scss'
  ]
})
export class PublicLayoutComponent extends BaseLayoutComponent implements OnInit {

  constructor() { super(); }

  ngOnInit() {
  }

}
