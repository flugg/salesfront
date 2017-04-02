import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const errorRoutes: Routes = [
  // {
  //   path: '**',
  //   redirectTo: '/404',
  //   pathMatch: 'full',
  // },
  // {
  //   path: '404',
  //   component: PageNotFoundComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(errorRoutes)],
  exports: [RouterModule],
})
export class ErrorsRoutingModule {
}
