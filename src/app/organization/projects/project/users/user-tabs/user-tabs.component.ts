import { Component } from '@angular/core';

import { MemberListService } from './member-list/member-list.service';
import { InviteListService } from './invite-list/invite-list.service';

@Component({
  providers: [
    MemberListService,
    InviteListService
  ],
  selector: 'vmo-user-tabs',
  templateUrl: './user-tabs.component.html'
})
export class UserTabsComponent {
  //
}
