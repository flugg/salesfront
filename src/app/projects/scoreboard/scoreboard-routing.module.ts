import { Routes, RouterModule } from '@angular/router';

import { ScoreboardComponent } from './scoreboard.component';
import { NgModule } from "@angular/core";

const scoreboardRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ScoreboardComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(scoreboardRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class ScoreboardRoutingModule {}
