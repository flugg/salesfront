import { Routes, RouterModule } from "@angular/router";
import { ProjectsComponent } from "./projects.component";
import { AuthGuard } from "../auth/auth-guard.service";
import { NgModule } from "@angular/core";

export const projectsRoutes: Routes = [
  {
    path: '',
    redirectTo: '/projects/1',
    pathMatch: 'full'
  },
  {
    path: 'projects/:id',
    component: ProjectsComponent,
    canLoad: [AuthGuard],
    children: [
      {
        path: 'scoreboard',
        loadChildren: 'app/scoreboard/scoreboard.module#ScoreboardModule'
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
