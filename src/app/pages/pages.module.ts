import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LayoutModule } from '../layout/layout.module';

import { BasePageComponent } from './base-page/base-page.component';
import { PageDashboardComponent } from './dashboard';

@NgModule({
  declarations: [
    PageDashboardComponent,
    BasePageComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule
  ],
  exports: []
})
export class PagesModule {}
