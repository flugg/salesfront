import { Component, OnDestroy, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig, MdDialog, MdDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Budget } from '../../../../../../core/models/budget.model';
import { DailyBudget } from '../../../../../../core/models/daily-budget.model';
import { MonthlyBudget } from '../../../../../../core/models/monthly-budget.model';
import { Project } from '../../../../../../core/models/project.model';
import { TeamMember } from '../../../../../../core/models/team-member.model';
import { Team } from '../../../../../../core/models/team.model';
import { BudgetService } from '../../../../../../core/services/budget.service';
import { TeamService } from '../../../../../../core/services/team.service';
import { ActiveProjectService } from '../../../../../active-project.service';
import { SelectedBudgetService } from '../selected-budget.service';
import { DistributeConfirmationDialogComponent } from '../../../distribute-confirmation-dialog/distribute-confirmation-dialog.component';

@Component({
  templateUrl: 'edit-budget.component.html'
})
export class EditBudgetComponent implements OnInit, OnDestroy {
  loading = true;
  project: Project;
  budget: Budget | DailyBudget | MonthlyBudget;
  teams: Team[];
  type: 'daily' | 'monthly' | 'custom';
  value: number;

  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private snackBar: MdSnackBar,
              private dialogService: MdDialog,
              private activeProjectService: ActiveProjectService,
              private selectedBudgetService: SelectedBudgetService,
              private budgetService: BudgetService,
              private teamService: TeamService) {}

  ngOnInit() {
    this.type = this.route.snapshot.parent.params['type'];
    this.subscriptions.push(Observable.combineLatest(
      this.activeProjectService.project,
      this.selectedBudgetService.budget
    ).subscribe(data => {
      [this.project, this.budget] = data;
      this.value = this.budget.value;

      this.teamService.getAll(this.project.id).subscribe(teams => {
        this.teams = teams.filter(team => team.members.length).map(team => {
          team.value = this.calculateTeamValue(team);
          team.enabled = this.isTeamEnabled(team);
          team.members = team.members.map(member => {
            member.value = this.calculateTeamMemberValue(member);
            member.enabled = this.isTeamMemberEnabled(member);
            return member;
          });
          return team;
        });

        this.loading = false;
      });
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

  isSameDay(budget: Budget): boolean {
    return moment(budget.startsAt).isSame(moment(budget.endsAt), 'day');
  }

  calculatedTotal(): number {
    return this.teams.filter(team => team.enabled).reduce((total, team) => total + this.calculatedTotalForTeam(team), 0);
  }

  calculatedTotalForTeam(team: Team): number {
    return team.members.filter(member => member.enabled).reduce((teamTotal, member) => teamTotal + member.value, 0);
  }

  submit(): void {
    const dialog = this.dialogService.open(DistributeConfirmationDialogComponent, <MdDialogConfig>{
      data: {
        budget: this.value,
        distributed: this.calculatedTotal()
      }
    });

    dialog.componentInstance.onConfirmed.subscribe(() => {
      const teamMembers = this.teams.filter(team => team.enabled).reduce((value, team) => {
        return [...value, ...team.members.filter(member => member.enabled).map(member => {
          return {
            id: member.id,
            value: member.value
          };
        })];
      }, []);

      dialog.afterClosed().subscribe(() => {
        this.budgetService.setBudgetGoals(this.budget.id, teamMembers).then(() => {
          this.snackBar.open('Budget updated', null, <MdSnackBarConfig>{ duration: 2000 });
          this.router.navigate(['..'], { relativeTo: this.route });
        });
      });
    });

  }

  teamChanged(enabled: boolean, team: Team): void {
    team.enabled = enabled;

    if (team.enabled && !this.teamMembersEnabled(team)) {
      team.members.forEach(member => member.enabled = true);
    }
  }

  teamMembersEnabled(team: Team): boolean {
    for (const member of team.members) {
      if (member.enabled) {
        return true;
      }
    }

    return false;
  }

  private calculateTeamValue(team: Team) {
    return this.budget.goals.filter(goal => goal.teamMember.teamId === team.id).reduce((value, goal) => {
      return value + goal.value;
    }, 0);
  }

  private isTeamEnabled(team: Team) {
    for (const goal of this.budget.goals) {
      if (goal.teamMember.teamId === team.id) {
        return true;
      }
    }

    return false;
  }

  private calculateTeamMemberValue(teamMember: TeamMember) {
    return this.budget.goals.filter(goal => goal.teamMemberId === teamMember.id).reduce((value, goal) => {
      return value + goal.value;
    }, 0);
  }

  private isTeamMemberEnabled(teamMember: TeamMember) {
    for (const goal of this.budget.goals) {
      if (goal.teamMemberId === teamMember.id) {
        return true;
      }
    }

    return false;
  }
}
