import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';

import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { DailyAward } from '../../../../../../core/models/daily-award.model';
import { User } from '../../../../../../core/models/user.model';
import { ActiveUserService } from '../../../../../../organization-list/active-user.service';
import { DailyTeamAwardListService } from './daily-team-award-list.service';
import { ScreenService } from '../../../../../../core/screen.service';
import { Project } from '../../../../../../core/models/project.model';
import { ActiveProjectService } from '../../../../../active-project.service';

@Component({
  templateUrl: 'daily-team-award-list.component.html',
  providers: [DailyTeamAwardListService]
})
export class DailyTeamAwardListComponent implements OnInit, OnDestroy {
  loading = true;
  user: User;
  project: Project;
  dailyAwards: DailyAward[];
  columns = 5;
  gutter = 24;

  private subscriptions: Subscription[] = [];

  constructor(public dailyTeamAwardListService: DailyTeamAwardListService,
              private screenService: ScreenService,
              private activeUserService: ActiveUserService,
              private activeProject: ActiveProjectService) {}

  ngOnInit(): void {
    this.subscriptions.push(Observable.combineLatest(
      this.activeUserService.user,
      this.activeProject.project,
      this.dailyTeamAwardListService.awards
    ).subscribe(data => {
      [this.user, this.project, this.dailyAwards] = data;
      this.loading = false;
    }));

    this.subscriptions.push(this.screenService.asObservable().subscribe(breakpoint => {
      if (breakpoint === 'md' || breakpoint === 'sm') {
        this.columns = 4;
      } else if (breakpoint === 'xs') {
        this.columns = 2;
      } else {
        this.columns = 5;
        this.gutter = 24;
      }
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
