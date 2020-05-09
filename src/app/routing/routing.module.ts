import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicLayoutComponent } from '../layout/public';
import { PageDashboardComponent} from '../pages/dashboard';

const PUBLIC_ROUTES: Routes = [
  { path: '', component: PageDashboardComponent }
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
