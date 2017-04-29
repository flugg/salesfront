import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { TeamListService } from './team-list.service';

@Component({
  providers: [TeamListService],
  templateUrl: 'teams.component.html'
})
export class TeamsComponent implements OnInit, OnDestroy {

  /**
   * Wether or not the component is currently loading.
   */
  isLoading = true;

  /**
   * List of all observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * List of loaded teams.
   */
  teams: any[];

  /**
   * Constructs the component.
   */
  constructor(private teamList: TeamListService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions.push(this.teamList.teams.subscribe(teams => {
      this.teams = teams;
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
