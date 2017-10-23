import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';

import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Budget } from '../../../../../../core/models/budget.model';

import { Project } from '../../../../../../core/models/project.model';
import { Team } from '../../../../../../core/models/team.model';
import { ActiveProjectService } from '../../../../../active-project.service';
import { SelectedBudgetService } from '../selected-budget.service';
import { TeamListService } from './team-list.service';
import { ActivatedRoute } from '@angular/router';
import { DailyBudget } from '../../../../../../core/models/daily-budget.model';
import { MonthlyBudget } from '../../../../../../core/models/monthly-budget.model';

@Component({
  templateUrl: 'team-list.component.html'
})
export class TeamListComponent implements OnInit, OnDestroy {
  loading = true;
  countComplete = false;
  project: Project;
  budget: Budget | DailyBudget | MonthlyBudget;
  teams: Team[];
  total: number;
  type: 'daily' | 'monthly' | 'custom';

  private subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute,
              private activeProjectService: ActiveProjectService,
              private selectedBudgetService: SelectedBudgetService,
              private teamListService: TeamListService) {}

  ngOnInit() {
    this.type = this.route.snapshot.parent.params['type'];
    this.subscriptions.push(Observable.combineLatest(
      this.activeProjectService.project,
      this.selectedBudgetService.budget,
      this.teamListService.teams
    ).subscribe(data => {
      [this.project, this.budget, this.teams] = data;
      this.total = this.calculateTotal(this.teams);
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

  private calculateTotal(teams: Team[]): number {
    return teams.reduce((value, team) => value + team.value, 0);
  }
}
