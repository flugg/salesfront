import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';

import { TeamListService } from './team-list.service';
import { ActiveUserService } from '../../../../active-user.service';
import { User } from '../../../../shared/user.model';

@Component({
  providers: [TeamListService],
  templateUrl: 'team-list.component.html'
})
export class TeamListComponent implements OnInit, OnDestroy {

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * List of loaded teams.
   */
  teams: any[];

  /**
   * The active user.
   */
  user: User;

  /**
   * List of observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the component.
   */
  constructor(public teamList: TeamListService,
              private activeUser: ActiveUserService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.activeUser.user,
      this.teamList.teams
    ).subscribe(data => {
      [this.user, this.teams] = data;
      this.loading = false;
    }));
  }

  /**
   * Destroys the component.
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
