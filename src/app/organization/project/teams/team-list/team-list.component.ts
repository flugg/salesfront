import { Component, OnDestroy, OnInit } from '@angular/core';

import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { User } from '../../../../core/models/user.model';
import { ActiveUserService } from '../../../../organization-list/active-user.service';
import { TeamListService } from './team-list.service';

@Component({
  providers: [TeamListService],
  templateUrl: 'team-list.component.html'
})
export class TeamListComponent implements OnInit, OnDestroy {
  loading = true;
  teams: any[];
  user: User;

  private subscriptions: Subscription[] = [];

  constructor(public teamList: TeamListService,
              private activeUser: ActiveUserService) {}

  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.activeUser.user,
      this.teamList.teams
    ).subscribe(data => {
      [this.user, this.teams] = data;
      this.loading = false;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
