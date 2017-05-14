import { Component } from '@angular/core';

import { InviteListService } from './invite-list/invite-list.service';
import { MemberListService } from './member-list/member-list.service';

@Component({
  providers: [
    InviteListService,
    MemberListService
  ],
  selector: 'vmo-user-tabs',
  templateUrl: 'user-tabs.component.html'
})
export class UserTabsComponent {
  //
}
