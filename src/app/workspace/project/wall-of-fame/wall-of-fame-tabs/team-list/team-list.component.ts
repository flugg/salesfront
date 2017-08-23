import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import * as moment from 'moment';

import { ActiveUserService } from '../../../../../organization-list/active-user.service';
import { DailyTeamAwardListService } from './daily-team-award-list.service';
import { WeeklyTeamAwardListService } from './weekly-team-award-list.service';
import { MonthlyTeamAwardListService } from './monthly-team-award-list.service';
import { YearlyTeamAwardListService } from './yearly-teamaward-list.service';
import { User } from '../../../../../core/models/user.model';
import { DailyAward } from '../../../../../core/models/daily-award.model';
import { WeeklyAward } from '../../../../../core/models/weekly-award.model';
import { MonthlyAward } from '../../../../../core/models/monthly-award.model';
import { YearlyAward } from '../../../../../core/models/yearly-award.model';

@Component({
  templateUrl: 'team-list.component.html'
})
export class TeamListComponent implements OnInit, OnDestroy {
  loading = true;
  user: User;
  dailyAwards: DailyAward[];
  weeklyAwards: WeeklyAward[];
  monthlyAwards: MonthlyAward[];
  yearlyAwards: YearlyAward[];

  private subscriptions: Subscription[] = [];

  constructor(public dailyTeamAwardListService: DailyTeamAwardListService,
              public weeklyTeamAwardListService: WeeklyTeamAwardListService,
              public monthlyTeamAwardListService: MonthlyTeamAwardListService,
              public yearlyTeamAwardListService: YearlyTeamAwardListService,
              private activeUser: ActiveUserService) {}

  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.activeUser.user,
      this.dailyTeamAwardListService.awards,
      this.weeklyTeamAwardListService.awards,
      this.monthlyTeamAwardListService.awards,
      this.yearlyTeamAwardListService.awards
    ).subscribe(data => {
      [this.user, this.dailyAwards, this.weeklyAwards, this.monthlyAwards, this.yearlyAwards] = data;
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
