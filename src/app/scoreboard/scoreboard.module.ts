import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ScoreboardComponent } from './scoreboard.component';
import { SharedModule } from '../shared/shared.module';
import { scoreboardRoutes } from './scoreboard.routes';

@NgModule({
  declarations: [
    ScoreboardComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(scoreboardRoutes)
  ]
})
export class ScoreboardModule { }