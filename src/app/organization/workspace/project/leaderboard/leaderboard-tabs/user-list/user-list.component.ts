import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LeaderboardListService } from '../leaderboard-list.service';
import { User } from '../../../../../shared/user.model';

@Component({
  providers: [LeaderboardListService],
  templateUrl: 'user-list.component.html'
})
export class UserListComponent implements OnInit, OnDestroy {

  /**
   * Wether or not the component is currently loading.
   */
  isLoading = true;

  /**
   * Users sales in project
   */
  users: User[];

  /**
   * List of observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the component.
   */
  constructor(public leaderboardListService: LeaderboardListService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions.push(this.leaderboardListService.sales.subscribe(users => {
      this.users = users as User[];
      this.isLoading = false;
    }));
  }

  /**
   * Destroys the component.
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
