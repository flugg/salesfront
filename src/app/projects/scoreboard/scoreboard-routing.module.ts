import {Routes, RouterModule} from '@angular/router';

import { ScoreboardComponent } from './scoreboard.component';
import {NgModule} from "@angular/core";

const scoreboardRoutes: Routes = [
  //{ path: '', redirectTo: 'scoreboard', pathMatch: 'full' },

]

@NgModule({
  imports: [
    RouterModule.forChild(scoreboardRoutes)
  ]
  , exports: [
    RouterModule
  ]
})

export class ScoreboardRoutingModule {}
