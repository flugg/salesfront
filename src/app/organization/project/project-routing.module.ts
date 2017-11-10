import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActiveProjectResolver } from './active-project-resolver.service';
import { ProjectComponent } from './project.component';
import { CloseSidenavResolver } from '../close-sidenav-resolver.service';

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
        resolve: { sidenavClosed: CloseSidenavResolver },
        loadChildren: 'app/organization/project/feed/feed.module#FeedModule'
      },
      {
        path: 'leaderboard',
        resolve: { sidenavClosed: CloseSidenavResolver },
        loadChildren: 'app/organization/project/leaderboard/leaderboard.module#LeaderboardModule'
      },
      {
        path: 'wall-of-fame',
        resolve: { sidenavClosed: CloseSidenavResolver },
        loadChildren: 'app/organization/project/wall-of-fame/wall-of-fame.module#WallOfFameModule'
      },
      {
        path: 'budgets',
        resolve: { sidenavClosed: CloseSidenavResolver },
        loadChildren: 'app/organization/project/budgets/budgets.module#BudgetsModule'
      },
      {
        path: 'sales',
        resolve: { sidenavClosed: CloseSidenavResolver },
        loadChildren: 'app/organization/project/sales/sales.module#SalesModule'
      },
      {
        path: 'products',
        resolve: { sidenavClosed: CloseSidenavResolver },
        loadChildren: 'app/organization/project/products/products.module#ProductsModule'
      },
      {
        path: 'teams',
        resolve: { sidenavClosed: CloseSidenavResolver },
        loadChildren: 'app/organization/project/teams/teams.module#TeamsModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {}
