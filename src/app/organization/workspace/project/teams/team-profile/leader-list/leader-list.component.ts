import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TeamLeader } from '../../../shared/team-leader.model';
import { LeaderListService } from './leader-list.service';

@Component({
  templateUrl: 'leader-list.component.html'
})
export class LeaderListComponent implements OnInit, OnDestroy {

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * List of loaded team leaders.
   */
  leaders: TeamLeader[];

  /**
   * List of observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the component.
   */
  constructor(public leaderList: LeaderListService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions.push(this.leaderList.leaders.subscribe(leaders => {
      this.leaders = leaders;
      this.loading = false;
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
