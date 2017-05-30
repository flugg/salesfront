import { Component, OnInit } from '@angular/core';

import { InviteListService } from './invite-list/invite-list.service';
import { MemberListService } from './member-list/member-list.service';
import { ActiveUserService } from '../../../../active-user.service';
import { User } from '../../../../shared/user.model';

@Component({
  providers: [
    InviteListService,
    MemberListService
  ],
  selector: 'vmo-user-tabs',
  templateUrl: 'user-tabs.component.html'
})
export class UserTabsComponent implements OnInit {

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * The active user.
   */
  user: User;

  /**
   * Constructs the component.
   */
  constructor(private activeUser: ActiveUserService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.activeUser.user.subscribe(user => {
      this.user = user;
      this.loading = false;
    });
  }
}
