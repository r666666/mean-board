import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { PublicLayoutComponent } from './public';
import { BaseLayoutComponent } from './base-layout';
import { PostComponent } from './conponents/post';
import { FormComponent } from './conponents/form';
import { DragDirective } from './conponents/form/drag-drop.directive';

@NgModule({
  declarations: [
    PublicLayoutComponent,
    BaseLayoutComponent,
    PostComponent,
    FormComponent,
    DragDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollToModule.forRoot()
  ],
  exports: [
    PostComponent,
    FormComponent
  ],
  providers: [],
  entryComponents: []
})
export class LayoutModule {}
