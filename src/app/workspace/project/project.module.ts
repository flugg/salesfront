import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { WorkspaceSharedModule } from '../shared/workspace-shared.module';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { ActiveProjectResolver } from './active-project-resolver.service';

@NgModule({
  imports: [
    SharedModule,
    WorkspaceSharedModule,
    ProjectRoutingModule
  ],
  declarations: [
    ProjectComponent,
  ],
  providers: [
    ActiveProjectResolver
  ]
})
export class ProjectModule {}
