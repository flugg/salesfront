import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LeaderboardTabsComponent } from './leaderboard-tabs/leaderboard-tabs.component';
import { TeamListComponent } from './leaderboard-tabs/team-list/team-list.component';
import { UserListComponent } from './leaderboard-tabs/user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'teams',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LeaderboardTabsComponent,
    children: [
      {
        path: 'teams',
        component: TeamListComponent
      },
      {
        path: 'users',
        component: UserListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaderboardRoutingModule {}
