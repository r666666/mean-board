import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PublicLayoutComponent } from './public';
import { BaseLayoutComponent } from './base-layout/base-layout.component';

@NgModule({
  declarations: [
    PublicLayoutComponent,
    BaseLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [],
  providers: [],
  entryComponents: []
})
export class LayoutModule {}
