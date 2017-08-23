import { Component, OnInit } from '@angular/core';

import { InviteListService } from './invite-list/invite-list.service';
import { MemberListService } from './member-list/member-list.service';
import { ActiveUserService } from '../../../../organization-list/active-user.service';
import { User } from '../../../../core/models/user.model';

@Component({
  providers: [InviteListService, MemberListService],
  selector: 'vmo-user-tabs',
  templateUrl: 'user-tabs.component.html'
})
export class UserTabsComponent implements OnInit {
  loading = true;
  user: User;

  constructor(private activeUser: ActiveUserService) {}

  ngOnInit() {
    this.activeUser.user.subscribe(user => {
      this.user = user;
      this.loading = false;
    });
  }
}
