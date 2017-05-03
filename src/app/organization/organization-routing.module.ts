import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectListComponent } from './project-list/project-list.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectResolver } from '../core/project-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ProjectListComponent
  },
  {
    path: 'new',
    component: CreateProjectComponent
  },
  {
    path: ':project',
    loadChildren: 'app/organization/project/project.module#ProjectModule',
    resolve: {
      project: ProjectResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule {
}
