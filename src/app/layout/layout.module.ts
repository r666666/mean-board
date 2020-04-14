import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PrivateLayoutComponent } from './private';

@NgModule({
  declarations: [
    PrivateLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [],
  providers: [],
  entryComponents: []
})
export class LayoutModule {}
