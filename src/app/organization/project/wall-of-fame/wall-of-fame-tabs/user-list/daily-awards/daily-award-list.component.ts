import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';

import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { DailyAward } from '../../../../../../core/models/daily-award.model';
import { Member } from '../../../../../../core/models/member.model';
import { Project } from '../../../../../../core/models/project.model';
import { ScreenService } from '../../../../../../core/screen.service';
import { ActiveMembershipService } from '../../../../../active-membership.service';
import { ActiveProjectService } from '../../../../../active-project.service';
import { DailyAwardListService } from './daily-award-list.service';

@Component({
  templateUrl: 'daily-award-list.component.html',
  providers: [DailyAwardListService]
})
export class DailyAwardListComponent implements OnInit, OnDestroy {
  loading = true;
  membership: Member;
  project: Project;
  dailyAwards: DailyAward[];
  columns = 5;
  gutter = 24;

  private subscriptions: Subscription[] = [];

  constructor(public dailyAwardListService: DailyAwardListService,
              private screenService: ScreenService,
              private activeMemberService: ActiveMembershipService,
              private activeProject: ActiveProjectService) {}

  ngOnInit(): void {
    this.subscriptions.push(Observable.combineLatest(
      this.activeMemberService.membership,
      this.activeProject.project,
      this.dailyAwardListService.awards
    ).subscribe(data => {
      [this.membership, this.project, this.dailyAwards] = data;
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
