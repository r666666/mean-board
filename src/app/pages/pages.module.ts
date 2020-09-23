import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LayoutModule } from '../layout/layout.module';
import { BasePageComponent } from './base-page/base-page.component';
import { PageDashboardComponent } from './dashboard';
import { PageBoardComponent } from './board/board.component';
import { PageThreadComponent } from './thread/thread.component';

@NgModule({
  declarations: [
    PageDashboardComponent,
    BasePageComponent,
    PageBoardComponent,
    PageThreadComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: []
})
export class PagesModule {}
