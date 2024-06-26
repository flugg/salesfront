import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';

import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { DailyAward } from '../../../../../core/models/daily-award.model';
import { Member } from '../../../../../core/models/member.model';
import { MonthlyAward } from '../../../../../core/models/monthly-award.model';
import { Project } from '../../../../../core/models/project.model';
import { WeeklyAward } from '../../../../../core/models/weekly-award.model';
import { YearlyAward } from '../../../../../core/models/yearly-award.model';
import { ActiveMembershipService } from '../../../../active-membership.service';
import { ActiveProjectService } from '../../../../active-project.service';
import { DailyAwardListService } from './daily-award-list.service';
import { MonthlyAwardListService } from './monthly-award-list.service';
import { WeeklyAwardListService } from './weekly-award-list.service';
import { YearlyAwardListService } from './yearly-award-list.service';

@Component({
  templateUrl: 'user-list.component.html'
})
export class UserListComponent implements OnInit, OnDestroy {
  loading = true;
  membership: Member;
  project: Project;
  dailyAwards: DailyAward[];
  weeklyAwards: WeeklyAward[];
  monthlyAwards: MonthlyAward[];
  yearlyAwards: YearlyAward[];

  private subscriptions: Subscription[] = [];

  constructor(public dailyAwardListService: DailyAwardListService,
              public weeklyAwardListService: WeeklyAwardListService,
              public monthlyAwardListService: MonthlyAwardListService,
              public yearlyAwardListService: YearlyAwardListService,
              private activeMemberService: ActiveMembershipService,
              private activeProject: ActiveProjectService) {}

  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.activeMemberService.membership,
      this.activeProject.project,
      this.dailyAwardListService.awards,
      this.weeklyAwardListService.awards,
      this.monthlyAwardListService.awards,
      this.yearlyAwardListService.awards
    ).subscribe(data => {
      [this.membership, this.project, this.dailyAwards, this.weeklyAwards, this.monthlyAwards, this.yearlyAwards] = data;
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
