import { Routes, RouterModule } from '@angular/router';

import { ScoreboardComponent } from './scoreboard.component';
import { NgModule } from '@angular/core';
import { ScoreboardlistsComponent } from './scoreboardlists/scoreboardlists.component';

const scoreboardRoutes: Routes = [
  {
    path: '',
    component: ScoreboardComponent,
    children: [
      {
        path: '',
        component: ScoreboardlistsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(scoreboardRoutes),
  ],
  exports: [
    RouterModule,
  ],
})

export class ScoreboardRoutingModule {
}
