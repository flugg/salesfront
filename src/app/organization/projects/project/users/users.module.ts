import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { InviteUserComponent } from './invite-user/invite-user.component';
import { InviteListComponent } from './user-tabs/invite-list/invite-list.component';
import { MemberListComponent } from './user-tabs/member-list/member-list.component';
import { UsersComponent } from './users.component';
import { UserProfileComponent } from './user/user-profile.component';
import { MembershipService } from './membership.service';
import { UserTabsComponent } from './user-tabs/user-tabs.component';

@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule
  ],
  declarations: [
    InviteUserComponent,
    UserTabsComponent,
    InviteListComponent,
    MemberListComponent,
    UsersComponent,
    UserProfileComponent
  ],
  providers: [
    MembershipService
  ]
})
export class UsersModule {}
