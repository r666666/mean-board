import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicLayoutComponent } from '../layout/public';
import { PageDashboardComponent} from '../pages/dashboard';
import { PageBoardComponent } from '../pages/board';
import { PageThreadComponent } from '../pages/thread';

const PUBLIC_ROUTES: Routes = [
  { path: '', component: PageDashboardComponent },
  { path: ':boardAddress', component: PageBoardComponent },
  { path: ':boardAddress/:threadId', component: PageThreadComponent }
];

export const ROUTES: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: PublicLayoutComponent,
    children: PUBLIC_ROUTES
  }
];

@NgModule({
  imports: [

  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
