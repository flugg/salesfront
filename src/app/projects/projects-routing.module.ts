import { Routes, RouterModule } from "@angular/router";
import { ProjectsComponent } from "./projects.component";
import { NgModule } from "@angular/core";
import {ProjectslistComponent} from "./projectslist/projectslist.component";
import { AuthGuard } from "../auth/auth-guard.service";

const prefixPath: string = 'app/projects/';

const projectsRoutes: Routes = [
  {
    path: 'projects',
    component: ProjectslistComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'projects/:id',
    component: ProjectsComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'scoreboard',
        pathMatch: 'full'
      },
      {
        path: 'scoreboard',
        loadChildren: prefixPath + 'scoreboard/scoreboard.module#ScoreboardModule'
      },
      {
        path: 'feed',
        loadChildren: prefixPath + 'feed/feed.module#FeedModule'
      },
      {
        path: 'users',
        loadChildren: prefixPath + 'users/users.module#UsersModule'
      }
      ,
      {
        path: 'teams',
        loadChildren: prefixPath + 'teams/teams.module#TeamsModule'
      },
      {
        path: 'budget',
        loadChildren: prefixPath + 'budget/budget.module#BudgetModule'
      },
      {
        path: 'sales',
        loadChildren: prefixPath + 'sales/sales.module#SalesModule'
      },
      {
        path: 'settings',
        loadChildren: prefixPath + 'settings/settings.module#SettingsModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(projectsRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class ProjectsRoutingModule {}
