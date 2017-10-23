import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';

import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { MonthlyBudgetListService } from './monthly-budget-list.service';
import { DailyBudget } from '../../../../../core/models/daily-budget.model';
import { ScreenService } from '../../../../../core/screen.service';
import { MonthlyBudget } from '../../../../../core/models/monthly-budget.model';
import { Budget } from '../../../../../core/models/budget.model';

@Component({
  templateUrl: 'monthly-budget-list.component.html',
  styleUrls: ['monthly-budget-list.component.scss'],
  providers: [MonthlyBudgetListService]
})
export class MonthlyBudgetListComponent implements OnInit, OnDestroy {
  loading = true;
  budgets: MonthlyBudget[];
  columns = 5;
  gutter = 24;

  private subscriptions: Subscription[] = [];

  constructor(public monthlyBudgetListServie: MonthlyBudgetListService,
              private screenService: ScreenService) {}

  ngOnInit(): void {
    this.subscriptions.push(Observable.combineLatest(
      this.monthlyBudgetListServie.budgets
    ).subscribe(data => {
      [this.budgets] = data;
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

  calculateProgress(budget: DailyBudget | MonthlyBudget | Budget): number {
    return budget.goals.reduce((value, goal) => value + goal.progress, 0);
  }

  calculatePercent(budget: DailyBudget | MonthlyBudget | Budget): number {
    if (budget.value === 0) {
      return 100;
    }

    return Math.round(this.calculateProgress(budget) * 100 / budget.value);
  }

  isActive(budget: MonthlyBudget): boolean {
    return moment(budget.month).isSame(moment(), 'month');
  }

  isSetForFuture(budget: MonthlyBudget): boolean {
    return moment(budget.month).isAfter(moment());
  }
}
