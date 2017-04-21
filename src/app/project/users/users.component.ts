import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User } from '../../core/models/user.model';
import { Subscription } from 'rxjs/Subscription';
import { InviteService } from './invites/invite.service';

@Component({
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  /**
   * Wether or not the component is currently loading.
   */
  isLoading = true;

  /**
   * The links and text for tabs
   * */
  tablinks: string[][];

  /**
   * Constructs the component.
   */
  constructor(private inviteService: InviteService) {
  }

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.tablinks = [['Members', 'members'], ['Invites', 'invites']];
    this.isLoading = false;
  }

  /**
   * Opens invite dialog
   * */
  startInvite() {
  }
}
