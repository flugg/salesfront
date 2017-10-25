import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import { Observable } from 'rxjs/Observable';

import { Budget } from '../../../../../core/models/budget.model';
import { DailyBudget } from '../../../../../core/models/daily-budget.model';
import { MonthlyBudget } from '../../../../../core/models/monthly-budget.model';
import { Sale } from '../../../../../core/models/sale.model';
import { ObservableResource } from '../../../../../core/observable-resource';
import { BudgetService } from '../../../../../core/services/budget.service';
import { SocketApiService } from '../../../../../core/socket-api.service';
import { ActiveProjectService } from '../../../../active-project.service';

@Injectable()
export class SelectedBudgetService extends ObservableResource implements OnDestroy {
  readonly budget: Observable<Budget | DailyBudget | MonthlyBudget> = this.subject.asObservable();

  constructor(private route: ActivatedRoute,
              private sockets: SocketApiService,
              private activeProjectService: ActiveProjectService,
              private budgetService: BudgetService) {
    super();

    this.activeProjectService.project.first().subscribe(project => {
      const type = this.route.snapshot.params['type'];
      if (type === 'daily') {
        this.budgetService.findDaily(this.route.snapshot.params['budget']).subscribe(budget => this.set(budget));
      } else if (type === 'monthly') {
        this.budgetService.findMonthly(this.route.snapshot.params['budget']).subscribe(budget => this.set(budget));
      } else if (type === 'custom') {
        this.budgetService.find(this.route.snapshot.params['budget']).subscribe(budget => this.set(budget));
      }

      this.sockets.listenForProject(project.id, {
        'sale_registered': sale => this.addSale(sale),
        'sale_deleted': sale => this.removeSale(sale),
        'daily_budget_updated': budget => this.updateBudget(budget, 'daily'),
        'monthly_budget_updated': budget => this.updateBudget(budget, 'monthly'),
        'custom_budget_updated': budget => this.updateBudget(budget, 'custom')
      }, this);
    });
  }

  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }

  private addSale(sale: Sale) {
    const dateValid = this.isSaleWithinDate(sale);

    if (dateValid) {
      const goal = this.snapshot.goals.find(item => item.teamMemberId === sale.teamMemberId);

      if (goal) {
        if (sale.value) {
          goal.progress += sale.value;
        } else {
          goal.progress += 1;
        }

        this.updateFromSnapshot();
      }
    }
  }

  private removeSale(sale: Sale) {
    const dateValid = this.isSaleWithinDate(sale);

    if (dateValid) {
      const goal = this.snapshot.goals.find(item => item.teamMemberId === sale.teamMemberId);

      if (goal) {
        if (sale.value) {
          goal.progress -= sale.value;
        } else {
          goal.progress -= 1;
        }

        this.updateFromSnapshot();
      }
    }
  }

  private updateBudget(updatedBudget: Budget | DailyBudget | MonthlyBudget, type: 'daily' | 'monthly' | 'custom') {
    if (this.snapshot.id === updatedBudget.id && type === this.route.snapshot.params['type']) {
      if (type === 'daily') {
        this.budgetService.findDaily(updatedBudget.id).subscribe(budget => {
          this.snapshot = budget;
          this.updateFromSnapshot();
        });
      } else if (type === 'monthly') {
        this.budgetService.findMonthly(updatedBudget.id).subscribe(budget => {
          this.snapshot = budget;
          this.updateFromSnapshot();
        });
      } else if (type === 'custom') {
        this.budgetService.find(updatedBudget.id).subscribe(budget => {
          this.snapshot = budget;
          this.updateFromSnapshot();
        });
      }
    }
  }

  private isSaleWithinDate(sale: Sale) {
    switch (this.route.snapshot.params['type']) {
      case 'daily':
        return moment(sale.soldAt).isSame(moment(this.snapshot.day), 'day');
      case 'monthly':
        return moment(sale.soldAt).isSame(moment(this.snapshot.day), 'month');
      case 'custom':
        return moment(sale.soldAt).isBetween(moment(this.snapshot.startsAt), moment(this.snapshot.endsAt));
    }
  }
}