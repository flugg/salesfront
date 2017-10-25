import { Component, OnDestroy, OnInit } from '@angular/core';
import { MdSnackBar, MdDialog, MdDialogConfig, MdSnackBarConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

import { Subscription } from 'rxjs/Subscription';
import { Budget } from '../../../../core/models/budget.model';
import { DailyBudget } from '../../../../core/models/daily-budget.model';
import { MonthlyBudget } from '../../../../core/models/monthly-budget.model';
import { Project } from '../../../../core/models/project.model';
import { ScreenService } from '../../../../core/screen.service';
import { BudgetService } from '../../../../core/services/budget.service';
import { TeamService } from '../../../../core/services/team.service';
import { ActiveProjectService } from '../../../active-project.service';
import { DistributeBudgetDialogComponent } from '../distribute-budget-dialog/distribute-budget-dialog.component';
import { EditExistingBudgetDialogComponent } from '../edit-existing-budget-dialog/edit-existing-budget-dialog.component';

@Component({
  templateUrl: 'add-budget.component.html',
  styleUrls: ['add-budget.component.scss']
})
export class AddBudgetComponent implements OnInit, OnDestroy {
  loading = true;
  pending = false;
  project: Project;
  type: 'daily' | 'monthly' | 'custom' = 'daily';
  value: number;
  day: Date;
  selectedMonth: number;
  year: number;
  from: Date;
  to: Date;
  name: string;
  mobile: boolean;
  months: string[];

  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private snackBar: MdSnackBar,
              private teamService: TeamService,
              private screenService: ScreenService,
              private activeProjectService: ActiveProjectService,
              private dialog: MdDialog,
              private budgetService: BudgetService) {}

  ngOnInit(): void {
    this.day = new Date();
    this.months = moment.months();
    this.selectedMonth = new Date().getMonth() + 1;
    this.year = new Date().getFullYear();
    this.activeProjectService.project.subscribe(project => {
      this.project = project;
      this.loading = false;
    });

    this.screenService.asObservable().subscribe(breakpoint => {
      this.mobile = breakpoint === 'xs' || breakpoint === 'sm';
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  submit() {
    this.pending = true;

    this.teamService.getAll(this.project.id).subscribe(teams => {
      const teamMemberCount = teams.reduce((previous, current) => previous + current.members.length, 0);
      const distributedValue = Math.floor(this.value / teamMemberCount);

      teams = teams.filter(team => team.members.length).map(team => {
        team.value = distributedValue * team.members.length;
        team.enabled = true;
        team.members = team.members.map(member => {
          member.value = distributedValue;
          member.enabled = true;
          return member;
        });
        return team;
      });

      if (this.type === 'daily') {
        this.budgetService.listDaily(this.project.id, moment(this.day).startOf('day'), moment(this.day).endOf('day')).subscribe(budgets => {
          if (budgets.length) {
            this.editExistingBudgetGoals(budgets[0]);
          } else {
            this.setBudgetGoals(teams);
          }
        });
      } else if (this.type === 'monthly') {
        this.budgetService.listMonthly(this.project.id, moment(this.getMonthDate()).startOf('month'), moment(this.getMonthDate()).endOf('month')).subscribe(budgets => {
          if (budgets.length) {
            this.editExistingBudgetGoals(budgets[0]);
          } else {
            this.setBudgetGoals(teams);
          }
        });
      } else {
        this.setBudgetGoals(teams);
      }
    });
  }

  private editExistingBudgetGoals(budget: Budget | DailyBudget | MonthlyBudget) {
    const dialog = this.dialog.open(EditExistingBudgetDialogComponent, <MdDialogConfig>{
      data: {
        type: this.type,
      }
    });

    this.pending = false;

    dialog.componentInstance.onConfirmed.subscribe(() => {
      dialog.afterClosed().subscribe(() => {
        this.router.navigate(['..', this.type, budget.id, 'edit'], { relativeTo: this.route });
      });
    });
  }

  setBudgetGoals(teams) {
    const dialog = this.dialog.open(DistributeBudgetDialogComponent, <MdDialogConfig>{
      panelClass: 'fullscreen-dialog',
      data: {
        value: this.value,
        type: this.type,
        date: this.type === 'daily' ? this.day : this.getMonthDate(),
        from: this.from,
        to: this.to,
        project: this.project,
        teams: teams
      }
    });

    this.pending = false;

    dialog.componentInstance.onDistribute.subscribe(data => {
      this.loading = true;

      const teamMembers = data.filter(team => team.enabled).reduce((value, team) => {
        return [...value, ...team.members.filter(member => member.enabled).map(member => {
          return {
            id: member.id,
            value: member.value
          };
        })];
      }, []);

      dialog.afterClosed().subscribe(() => {
        if (this.type === 'daily') {
          this.budgetService.createDaily(this.project.id, moment(this.day)).then(budget => {
            this.budgetService.setBudgetGoals(budget.id, teamMembers).then(() => {
              this.snackBar.open('Daily budget created', null, <MdSnackBarConfig>{ duration: 2000 });
              this.router.navigate(['..'], { relativeTo: this.route });
            });
          });
        } else if (this.type === 'monthly') {
          this.budgetService.createMonthly(this.project.id, moment(this.getMonthDate())).then(budget => {
            this.budgetService.setBudgetGoals(budget.id, teamMembers).then(() => {
              this.snackBar.open('Monthly budget created', null, <MdSnackBarConfig>{ duration: 2000 });
              this.router.navigate(['..'], { relativeTo: this.route });
            });
          });
        } else if (this.type === 'custom') {
          this.budgetService.create(this.project.id, this.name, moment(this.from), moment(this.to)).then(budget => {
            this.budgetService.setBudgetGoals(budget.id, teamMembers).then(() => {
              this.snackBar.open('Budget created', null, <MdSnackBarConfig>{ duration: 2000 });
              this.router.navigate(['..'], { relativeTo: this.route });
            });
          });
        }
      });
    });
  }

  getMonthDate() {
    return moment.utc(`${this.year}-${this.selectedMonth < 10 ? '0' + this.selectedMonth : this.selectedMonth}-01`).toDate();
  }
}
