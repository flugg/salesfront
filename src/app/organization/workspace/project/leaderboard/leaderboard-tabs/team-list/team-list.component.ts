import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LeaderboardListService } from '../leaderboard-list.service';
import { Team } from '../../../shared/team.model';

@Component({
  providers: [LeaderboardListService],
  templateUrl: 'team-list.component.html'
})
export class TeamListComponent implements OnInit, OnDestroy {

  /**
   * Wether or not the component is currently loading.
   */
  isLoading = true;

  /**
   * List of teams sale stats
   */
  teams: Team[];

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
    this.subscriptions.push(this.leaderboardListService.sales.subscribe(teams => {
      this.teams = teams as Team[];
      this.isLoading = false;
    }));
  }

  /**
   * Destroys the component.
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
