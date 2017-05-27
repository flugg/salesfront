import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { WorkspaceSharedModule } from '../../shared/workspace-shared.module';
import { TeamsRoutingModule } from './teams-routing.module';
import { CreateTeamComponent } from './create-team/create-team.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamProfileComponent } from './team-profile/team-profile.component';
import { LeaderListComponent } from './team-profile/leader-list/leader-list.component';
import { MemberListComponent } from './team-profile/member-list/member-list.component';

@NgModule({
  imports: [
    SharedModule,
    WorkspaceSharedModule,
    TeamsRoutingModule
  ],
  declarations: [
    CreateTeamComponent,
    TeamListComponent,
    TeamProfileComponent,
    LeaderListComponent,
    MemberListComponent
  ]
})
export class TeamsModule {}
