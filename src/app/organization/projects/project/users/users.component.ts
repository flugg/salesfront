import { Component } from '@angular/core';

import { MemberListService } from './user-tabs/member-list/member-list.service';
import { InviteListService } from './user-tabs/invite-list/invite-list.service';

@Component({
  providers: [
    MemberListService,
    InviteListService
  ],
  templateUrl: './users.component.html'
})
export class UsersComponent {
  //
}
