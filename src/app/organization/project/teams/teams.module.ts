import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { OrganizationSharedModule } from '../../shared/organization-shared.module';
import { TeamsRoutingModule } from './teams-routing.module';
import { AddMemberComponent } from './add-member/add-member.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { EditMembersComponent } from './edit-members/edit-members.component';
import { DeleteConfirmationComponent } from './edit-team/delete-confirmation/delete-confirmation.component';
import { EditTeamComponent } from './edit-team/edit-team.component';
import { TeamListComponent } from './team-list/team-list.component';
import { MemberListComponent } from './team-profile/member-list/member-list.component';
import { TeamProfileComponent } from './team-profile/team-profile.component';
import { FilteredMembershipsPipe } from './add-member/filtered-memberships.pipe';

@NgModule({
  imports: [
    SharedModule,
    OrganizationSharedModule,
    TeamsRoutingModule
  ],
  declarations: [
    AddMemberComponent,
    CreateTeamComponent,
    DeleteConfirmationComponent,
    EditMembersComponent,
    EditTeamComponent,
    MemberListComponent,
    TeamListComponent,
    TeamProfileComponent,
    FilteredMembershipsPipe
  ],
  entryComponents: [
    DeleteConfirmationComponent
  ]
})
export class TeamsModule {}
