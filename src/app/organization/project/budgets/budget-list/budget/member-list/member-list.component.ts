import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Budget } from '../../../../../../core/models/budget.model';
import { DailyBudget } from '../../../../../../core/models/daily-budget.model';
import { Member } from '../../../../../../core/models/member.model';
import { MonthlyBudget } from '../../../../../../core/models/monthly-budget.model';
import { Project } from '../../../../../../core/models/project.model';
import { ActiveProjectService } from '../../../../../active-project.service';
import { SelectedBudgetService } from '../selected-budget.service';
import { MemberListService } from './member-list.service';

@Component({
  templateUrl: 'member-list.component.html'
})
export class MemberListComponent implements OnInit, OnDestroy {
  loading = true;
  countComplete = false;
  project: Project;
  budget: Budget | DailyBudget | MonthlyBudget;
  members: Member[];
  total: number;
  type: 'daily' | 'monthly' | 'custom';

  private subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute,
              private activeProjectService: ActiveProjectService,
              private selectedBudgetService: SelectedBudgetService,
              private memberListService: MemberListService) {}

  ngOnInit() {
    this.type = this.route.snapshot.parent.params['type'];
    this.subscriptions.push(Observable.combineLatest(
      this.activeProjectService.project,
      this.selectedBudgetService.budget,
      this.memberListService.members
    ).subscribe(data => {
      [this.project, this.budget, this.members] = data;
      this.total = this.calculateTotal(this.members);
      this.loading = false;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  formatDay(date: string): string {
    const day = moment(date);
    const today = moment();

    if (day.isSame(today.clone().add(1, 'day'), 'day')) {
      return 'Tomorrow';
    }

    if (day.isSame(today, 'day')) {
      return 'Today';
    }

    if (day.isSame(today.clone().subtract(1, 'day'), 'day')) {
      return 'Yesterday';
    }

    return day.format('Do MMM');
  }

  calculateProgress(budget: Budget): number {
    return budget.goals.reduce((value, goal) => value + goal.progress, 0);
  }

  calculatePercent(budget: Budget): number {
    if (budget.value === 0) {
      return 100;
    }

    return Math.round(this.calculateProgress(budget) * 100 / budget.value);
  }

  isSameDay(budget: Budget): boolean {
    return moment(budget.startsAt).isSame(moment(budget.endsAt), 'day');
  }

  private calculateTotal(members: Member[]): number {
    return members.reduce((value, member) => value + member.value, 0);
  }
}
