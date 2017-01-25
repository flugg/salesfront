import { Routes, RouterModule } from "@angular/router";
import { ProjectsComponent } from "./projects.component";
import { NgModule } from "@angular/core";
import {ProjectslistComponent} from "./projectslist/projectslist.component";

const prefixPath: string = 'app/projects/';

const projectsRoutes: Routes = [
  {
    path: '',
    component: ProjectslistComponent,
    pathMatch: 'full'
  },
  {
    path: 'projects/:id',
    component: ProjectsComponent,
    pathMatch: 'full',
    children: [
      {
        path: 'feed',
        loadChildren: prefixPath + 'feed/feed.module#FeedModule'
      },
      {
        path: 'scoreboard',
        loadChildren: prefixPath + 'scoreboard/scoreboard.module#ScoreboardModule'
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
