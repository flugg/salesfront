import { Component, OnInit } from '@angular/core';

import { SalesListService } from './sales-list.service';
import { UserListService } from './user-list/user-list.service';
import { TeamListService } from './team-list/team-list.service';

@Component({
  providers: [SalesListService, UserListService, TeamListService],
  selector: 'vmo-leaderboard-tabs',
  templateUrl: 'leaderboard-tabs.component.html'
})
export class LeaderboardTabsComponent implements OnInit {

  date: string;

  /**
   * Constructs the component.
   */
  constructor() {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.date = 'Today';
  }
}
