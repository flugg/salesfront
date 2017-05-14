import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActiveProjectResolver } from './active-project-resolver.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'feed',
    pathMatch: 'full'
  },
  {
    path: '',
    resolve: {
      project: ActiveProjectResolver
    },
    children: [
      {
        path: 'feed',
        loadChildren: 'app/organization/workspace/project/feed/feed.module#FeedModule'
      },
      {
        path: 'leaderboard',
        loadChildren: 'app/organization/workspace/project/leaderboard/leaderboard.module#LeaderboardModule'
      },
      {
        path: 'sales',
        loadChildren: 'app/organization/workspace/project/sales/sales.module#SalesModule'
      },
      {
        path: 'users',
        loadChildren: 'app/organization/workspace/project/users/users.module#UsersModule'
      },
      {
        path: 'teams',
        loadChildren: 'app/organization/workspace/project/teams/teams.module#TeamsModule'
      },
      {
        path: 'settings',
        loadChildren: 'app/organization/workspace/project/settings/settings.module#SettingsModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {}
