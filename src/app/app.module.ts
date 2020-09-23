import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, ExtraOptions } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { BoardService } from './services/board/board.service';
import { AppComponent } from './app.component';
import { ROUTES, RoutingModule } from './routing/routing.module';
import { LayoutModule } from './layout/layout.module';
import { PagesModule } from './pages/pages.module';

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
};

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, routerOptions),
    RoutingModule,
    LayoutModule,
    PagesModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    BoardService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
