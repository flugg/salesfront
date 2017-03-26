import { Routes, RouterModule } from '@angular/router';

import { FeedComponent } from './feed.component';
import { NgModule } from '@angular/core';

const feedRoutes: Routes = [
  //{ path: '', redirectTo: '/feed', pathMatch: 'full' },
  {
    path: '',
    component: FeedComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(feedRoutes),
  ],
  exports: [
    RouterModule,
  ],
})

export class FeedRoutingModule {
}
