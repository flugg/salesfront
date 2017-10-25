import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';

import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Budget } from '../../../../core/models/budget.model';
import { DailyBudget } from '../../../../core/models/daily-budget.model';
import { Member } from '../../../../core/models/member.model';
import { MonthlyBudget } from '../../../../core/models/monthly-budget.model';
import { ActiveMembershipService } from '../../../active-membership.service';
import { CustomBudgetListService } from './custom-budget-list.service';
import { DailyBudgetListService } from './daily-budget-list.service';
import { MonthlyBudgetListService } from './monthly-budget-list.service';

@Component({
  templateUrl: 'budget-list.component.html',
  styleUrls: ['budget-list.component.scss'],
  providers: [DailyBudgetListService, MonthlyBudgetListService, CustomBudgetListService]
})
export class BudgetListComponent implements OnInit, OnDestroy {
  loading = true;
  membership: Member;
  dailyBudgets: DailyBudget[];
  monthlyBudgets: MonthlyBudget[];
  customBudgets: Budget[];
  budgets = [
    {
      name: 'Daily',
      date: 'Today',
      progress: 130
    },
    {
      name: 'Monthly',
      date: 'October',
      progress: 30
    }
  ];

  private subscriptions: Subscription[] = [];

  constructor(private activeMembershipService: ActiveMembershipService,
              public dailyBudgetListService: DailyBudgetListService,
              public monthlyBudgetListService: MonthlyBudgetListService,
              public customBudgetListService: CustomBudgetListService) {}

  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.activeMembershipService.membership,
      this.dailyBudgetListService.budgets,
      this.monthlyBudgetListService.budgets,
      this.customBudgetListService.budgets,
    ).subscribe(data => {
      [this.membership, this.dailyBudgets, this.monthlyBudgets, this.customBudgets] = data;
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

  calculateProgress(budget: DailyBudget | MonthlyBudget | Budget): number {
    return budget.goals.reduce((value, goal) => value + goal.progress, 0);
  }

  calculatePercent(budget: DailyBudget | MonthlyBudget | Budget): number {
    if (budget.value === 0) {
      return 100;
    }

    return Math.floor(this.calculateProgress(budget) * 100 / budget.value);
  }

  isDailyActive(budget: DailyBudget): boolean {
    return moment(budget.day).isSame(moment(), 'day');
  }

  isMonthlyActive(budget: MonthlyBudget): boolean {
    return moment(budget.month).isSame(moment(), 'month');
  }

  isCustomActive(budget: Budget): boolean {
    return moment().isBetween(moment(budget.startsAt), moment(budget.endsAt));
  }

  isSameDay(budget: Budget): boolean {
    return moment(budget.startsAt).isSame(moment(budget.endsAt), 'day');
  }
}
