import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectComponent } from './project.component';
import { ActiveProjectResolver } from './active-project-resolver.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'feed',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ProjectComponent,
    resolve: { project: ActiveProjectResolver },
    children: [
      {
        path: 'feed',
        loadChildren: 'app/workspace/project/feed/feed.module#FeedModule'
      },
      {
        path: 'leaderboard',
        loadChildren: 'app/workspace/project/leaderboard/leaderboard.module#LeaderboardModule'
      },
      {
        path: 'wall-of-fame',
        loadChildren: 'app/workspace/project/wall-of-fame/wall-of-fame.module#WallOfFameModule'
      },
      {
        path: 'sales',
        loadChildren: 'app/workspace/project/sales/sales.module#SalesModule'
      },
      {
        path: 'users',
        loadChildren: 'app/workspace/project/users/users.module#UsersModule'
      },
      {
        path: 'teams',
        loadChildren: 'app/workspace/project/teams/teams.module#TeamsModule'
      },
      {
        path: 'settings',
        loadChildren: 'app/workspace/project/settings/settings.module#SettingsModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {
}
