import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './project.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectComponent,
    children: [
      {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full'
      },
      {
        path: 'feed',
        loadChildren: 'app/project/feed/feed.module#FeedModule'
      },
      {
        path: 'leaderboard',
        loadChildren: 'app/project/leaderboard/leaderboard.module#LeaderboardModule'
      },
      {
        path: 'budgets',
        loadChildren: 'app/project/budgets/budgets.module#BudgetsModule'
      },
      {
        path: 'sales',
        loadChildren: 'app/project/sales/sales.module#SalesModule'
      },
      {
        path: 'users',
        loadChildren: 'app/project/users/users.module#UsersModule'
      },
      {
        path: 'teams',
        loadChildren: 'app/project/teams/teams.module#TeamsModule'
      },
      {
        path: 'settings',
        loadChildren: 'app/project/settings/settings.module#SettingsModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProjectRoutingModule {}
