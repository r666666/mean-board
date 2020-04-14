import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivateLayoutComponent } from '../layout/private';
import { PageDashboardComponent } from '../pages/dashboard';

const PRIVATE_ROUTES: Routes = [
  { path: 'dashboard', component: PageDashboardComponent },
];

export const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'private/dashboard'
  },
  {
    path: 'private',
    component: PrivateLayoutComponent,
    children: PRIVATE_ROUTES
  }
];

@NgModule({
  imports: [],
  exports: [RouterModule]
})
export class AppRoutingModule {}
