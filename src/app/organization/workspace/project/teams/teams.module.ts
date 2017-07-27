import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { WorkspaceSharedModule } from '../../shared/workspace-shared.module';
import { TeamsRoutingModule } from './teams-routing.module';
import { CreateTeamComponent } from './create-team/create-team.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamProfileComponent } from './team-profile/team-profile.component';
import { LeaderListComponent } from './team-profile/leader-list/leader-list.component';
import { MemberListComponent } from './team-profile/member-list/member-list.component';
import { EditMembersComponent } from './edit-members/edit-members.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { FilteredMembershipsPipe } from './add-member/filtered-memberships.pipe';
import { EditTeamComponent } from './edit-team/edit-team.component';

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
    EditTeamComponent,
    LeaderListComponent,
    MemberListComponent,
    EditMembersComponent,
    AddMemberComponent,
    FilteredMembershipsPipe
  ]
})
export class TeamsModule {}
