import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'feed'
  },
  {
    path: 'feed',
    loadChildren: 'app/project/feed/feed.module#FeedModule'
  },
  {
    path: 'scoreboard',
    loadChildren: 'app/project/scoreboard/scoreboard.module#ScoreboardModule'
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