import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { WorkspaceSharedModule } from '../../shared/workspace-shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserTabsComponent } from './user-tabs/user-tabs.component';
import { InviteListComponent } from './user-tabs/invite-list/invite-list.component';
import { MemberListComponent } from './user-tabs/member-list/member-list.component';
import { InviteUserComponent } from './invite-user/invite-user.component';
import { InviteService } from './shared/invite.service';

@NgModule({
  imports: [
    SharedModule,
    WorkspaceSharedModule,
    UsersRoutingModule
  ],
  declarations: [
    UserProfileComponent,
    UserTabsComponent,
    InviteListComponent,
    MemberListComponent,
    InviteUserComponent
  ],
  providers: [
    InviteService
  ]
})
export class UsersModule {}
