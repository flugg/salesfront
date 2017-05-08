import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectListComponent } from './project-list/project-list.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectResolver } from '../project-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ProjectListComponent,
    children: [
      {
        path: 'new',
        component: CreateProjectComponent
      }
    ]
  },
  {
    path: ':project',
    loadChildren: 'app/organization/projects/project/project.module#ProjectModule',
    resolve: {
      project: ProjectResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule {}
