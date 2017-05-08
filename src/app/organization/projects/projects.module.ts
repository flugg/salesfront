import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ProjectsRoutingModule } from './projects-routing.module';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectResolver } from '../project-resolver.service';

@NgModule({
  imports: [
    SharedModule,
    ProjectsRoutingModule
  ],
  declarations: [
    CreateProjectComponent,
    ProjectListComponent
  ],
  providers: [
    ProjectResolver
  ]
})
export class ProjectsModule {}
