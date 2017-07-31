import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './organization.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectService } from './shared/project.service';
import { UserService } from './shared/user.service';
import { MembershipService } from './shared/membership.service';
import { TeamMemberService } from './shared/team-member.service';
import { SessionService } from './shared/session.service';
import { UnreadConversationService } from './shared/unread-conversation.service';

@NgModule({
  imports: [
    SharedModule,
    OrganizationRoutingModule
  ],
  declarations: [
    OrganizationComponent,
    CreateProjectComponent,
    ProjectListComponent
  ],
  providers: [
    ProjectService,
    UserService,
    MembershipService,
    TeamMemberService,
    SessionService,
    UnreadConversationService
  ]
})
export class OrganizationModule {}
