import { Component, OnInit } from '@angular/core';

@Component({
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
