import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Budget } from '../../../../../core/models/budget.model';
import { DailyBudget } from '../../../../../core/models/daily-budget.model';
import { MonthlyBudget } from '../../../../../core/models/monthly-budget.model';
import { ObservableResource } from '../../../../../core/observable-resource';
import { BudgetService } from '../../../../../core/services/budget.service';
import { SocketApiService } from '../../../../../core/socket-api.service';
import { ActiveProjectService } from '../../../../active-project.service';
import { Sale } from '../../../../../core/models/sale.model';

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
        'budget_updated': budget => this.updateBudget(budget)
      }, this);
    });
  }

  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }

  private addSale(sale: Sale) {
    const goal = this.snapshot.goals.find(goal => goal.teamMemberId === sale.teamMemberId);

    if (goal) {
      if (sale.value) {
        goal.progress += sale.value;
      } else {
        goal.progress += 1;
      }

      this.updateFromSnapshot();
    }
  }

  private removeSale(sale: Sale) {
    const goal = this.snapshot.goals.find(goal => goal.teamMemberId === sale.teamMemberId);

    if (goal) {
      if (sale.value) {
        goal.progress -= sale.value;
      } else {
        goal.progress -= 1;
      }

      this.updateFromSnapshot();
    }
  }

  private updateBudget(budget: Budget | DailyBudget | MonthlyBudget) {
    if (this.snapshot.id === budget.id) {
      this.snapshot = budget;
    }

    this.updateFromSnapshot();
  }
}