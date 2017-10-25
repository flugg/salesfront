import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';

import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { slideIn } from '../../../../../../../core/animations/slide-in';
import { Budget } from '../../../../../../../core/models/budget.model';
import { DailyBudget } from '../../../../../../../core/models/daily-budget.model';
import { Member } from '../../../../../../../core/models/member.model';
import { MonthlyBudget } from '../../../../../../../core/models/monthly-budget.model';
import { Project } from '../../../../../../../core/models/project.model';
import { Team } from '../../../../../../../core/models/team.model';
import { ActiveProjectService } from '../../../../../../active-project.service';
import { SelectedBudgetService } from '../../selected-budget.service';
import { MemberListService } from './member-list.service';
import { SelectedTeamService } from './selected-team.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  providers: [SelectedTeamService, MemberListService],
  templateUrl: 'team.component.html',
  animations: [slideIn()]
})
export class TeamComponent implements OnInit, OnDestroy {
  loading = true;
  countComplete = false;
  project: Project;
  budget: Budget | DailyBudget | MonthlyBudget;
  team: Team;
  members: Member[];
  total: number;
  totalBudget: number;
  type: 'daily' | 'monthly' | 'custom';

  private subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute,
              private activeProjectService: ActiveProjectService,
              private selectedBudgetService: SelectedBudgetService,
              private selectedTeam: SelectedTeamService,
              private memberListService: MemberListService) {}

  ngOnInit() {
    this.type = this.route.snapshot.parent.parent.params['type'];
    this.subscriptions.push(Observable.combineLatest(
      this.activeProjectService.project,
      this.selectedBudgetService.budget,
      this.selectedTeam.team,
      this.memberListService.members
    ).subscribe(data => {
      [this.project, this.budget, this.team, this.members] = data;
      this.total = this.members.reduce((value, member) => value + member.value, 0);
      this.totalBudget = this.budget.goals.filter(goal => {
        return goal.teamMember.teamId === this.team.id;
      }).reduce((value, goal) => value + goal.value, 0);

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

  calculateProgress(): number {
    return this.budget.goals.filter(goal => {
      return goal.teamMember.teamId === this.team.id;
    }).reduce((value, goal) => value + goal.progress, 0);
  }

  calculatePercent(): number {
    if (this.totalBudget === 0) {
      return 100;
    }

    return Math.floor(this.calculateProgress() * 100 / this.totalBudget);
  }

  isSameDay(budget: Budget): boolean {
    return moment(budget.startsAt).isSame(moment(budget.endsAt), 'day');
  }
}
