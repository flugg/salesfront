import { Routes, RouterModule } from "@angular/router";
import { ProjectsComponent } from "./projects.component";
import { NgModule } from "@angular/core";

export const projectsRoutes: Routes = [
  {
    path: 'projects/:id',
    component: ProjectsComponent,
    children: [
      {
        path: 'scoreboard',
        loadChildren: 'app/projects/scoreboard/scoreboard.module#ScoreboardModule'
      },
      {
        path: 'feed',
        loadChildren: 'app/projects/feed/feed.module#FeedModule'
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
