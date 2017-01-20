import { Routes } from '@angular/router';

import { ScoreboardComponent } from './scoreboard.component';

export const scoreboardRoutes: Routes = [
  { path: '', redirectTo: 'scoreboard', pathMatch: 'full' },
  { path: '**/scoreboard', component: ScoreboardComponent }
]
