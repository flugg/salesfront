import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { InvitesComponent } from './invites/invites.component';
import { MembersComponent } from './members/members.component';
import { UsersComponent } from './users.component';
import { UserComponent } from './user/user.component';
import { MembershipService } from './membership.service';

@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule
  ],
  declarations: [
    InvitesComponent,
    MembersComponent,
    UsersComponent,
    UserComponent
  ],
  providers: [
    MembershipService
  ]
})
export class UsersModule {}
