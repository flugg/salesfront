import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import * as moment from 'moment';

import { DailyTeamAwardListService } from './daily-team-award-list.service';
import { ActiveUserService } from '../../../../../../organization-list/active-user.service';
import { DailyAward } from '../../../../../../core/models/daily-award.model';
import { User } from '../../../../../../core/models/user.model';

@Component({
  templateUrl: 'daily-team-award-list.component.html',
  providers: [DailyTeamAwardListService]
})
export class DailyTeamAwardListComponent implements OnInit, OnDestroy {
  loading = true;
  user: User;
  dailyAwards: DailyAward[];

  private subscriptions: Subscription[] = [];

  constructor(public dailyTeamAwardListService: DailyTeamAwardListService,
              private activeUserService: ActiveUserService) {}

  ngOnInit(): void {
    this.subscriptions.push(Observable.combineLatest(
      this.activeUserService.user,
      this.dailyTeamAwardListService.awards,
    ).subscribe(data => {
      [this.user, this.dailyAwards] = data;
      this.loading = false;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  formatDay(date: string): string {
    const day = moment(date);
    const today = moment();

    if (day.isSame(today.subtract(1, 'day'), 'd')) {
      return 'Yesterday';
    }

    if (day.isAfter(today.subtract(7, 'day'))) {
      return day.format('dddd');
    }

    return day.format('Do MMM');
  }
}
