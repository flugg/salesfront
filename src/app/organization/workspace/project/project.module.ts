import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { WorkspaceSharedModule } from '../shared/workspace-shared.module';
import { ProjectRoutingModule } from './project-routing.module';
import { ActiveProjectResolver } from './active-project-resolver.service';
import { TeamService } from './shared/team.service';

@NgModule({
  imports: [
    SharedModule,
    WorkspaceSharedModule,
    ProjectRoutingModule
  ],
  providers: [
    ActiveProjectResolver,
    TeamService
  ]
})
export class ProjectModule {}
