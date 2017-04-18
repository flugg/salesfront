import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { MembersComponent } from './members/members.component';
import { InvitesComponent } from './invites/invites.component';

@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule
  ],
  declarations: [
    UsersComponent,
    MembersComponent,
    InvitesComponent
  ]
})
export class UsersModule {}
