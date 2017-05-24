import { Component, OnInit } from '@angular/core';

import { SalesListService } from './sales-list.service';

@Component({
  providers: [SalesListService],
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
