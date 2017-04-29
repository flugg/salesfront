import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LeaderboardComponent } from './leaderboard.component';
import { TeamComponent } from './team/team.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: LeaderboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'teams',
        pathMatch: 'full'
      },
      {
        path: 'teams',
        component: TeamComponent
      },
      {
        path: 'users',
        component: UsersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaderboardRoutingModule {}
