import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectComponent } from './project.component';
import { SidebarResolver } from '../../../core/sidebar/sidebar-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ProjectComponent,
    resolve: {
      sidebar: SidebarResolver
    },
    children: [
      {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full'
      },
      {
        path: 'feed',
        loadChildren: 'app/organization/projects/project/feed/feed.module#FeedModule'
      },
      {
        path: 'leaderboard',
        loadChildren: 'app/organization/projects/project/leaderboard/leaderboard.module#LeaderboardModule'
      },
      {
        path: 'budgets',
        loadChildren: 'app/organization/projects/project/budgets/budgets.module#BudgetsModule'
      },
      {
        path: 'sales',
        loadChildren: 'app/organization/projects/project/sales/sales.module#SalesModule'
      },
      {
        path: 'users',
        loadChildren: 'app/organization/projects/project/users/users.module#UsersModule'
      },
      {
        path: 'teams',
        loadChildren: 'app/organization/projects/project/teams/teams.module#TeamsModule'
      },
      {
        path: 'settings',
        loadChildren: 'app/organization/projects/project/settings/settings.module#SettingsModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {}
