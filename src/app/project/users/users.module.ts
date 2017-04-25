import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { MembersComponent } from './members/members.component';
import { InvitesComponent } from './invites/invites.component';
import { MemberService } from './member.service';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule
  ],
  declarations: [
    UsersComponent,
    MembersComponent,
    InvitesComponent,
    UserComponent
  ],
  providers: [
    MemberService
  ]
})
export class UsersModule {}
