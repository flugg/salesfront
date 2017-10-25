import { Injectable, OnDestroy } from '@angular/core';
import * as moment from 'moment';

import 'rxjs/add/operator/first';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { MonthlyBudget } from '../../../../../core/models/monthly-budget.model';
import { Sale } from '../../../../../core/models/sale.model';
import { ObservableResourceList } from '../../../../../core/observable-resource-list';
import { BudgetService } from '../../../../../core/services/budget.service';
import { SocketApiService } from '../../../../../core/socket-api.service';
import { ActiveProjectService } from '../../../../active-project.service';

@Injectable()
export class MonthlyBudgetListService extends ObservableResourceList implements OnDestroy {
  readonly budgets: Observable<MonthlyBudget[]> = this.subject.asObservable();
  protected limit = 30;
  protected paginator: BehaviorSubject<number> = new BehaviorSubject(this.limit);

  constructor(private sockets: SocketApiService,
              private activeProjectService: ActiveProjectService,
              private budgetService: BudgetService) {
    super();

    this.activeProjectService.project.first().subscribe(project => {
      this.paginator.subscribe(limit => {
        this.pagination(this.budgetService.paginateMonthly(project.id, limit, this.cursor)).subscribe(budgets => this.add(budgets));
      });

      this.sockets.listenForProject(project.id, {
        'sale_registered': sale => this.addSale(sale),
        'sale_deleted': sale => this.removeSale(sale),
        'monthly_budget_created': budget => this.addBudget(budget),
        'monthly_budget_updated': budget => this.updateBudget(budget)
      }, this);
    });
  }

  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }

  protected updateFromSnapshot() {
    this.snapshot = this.sort(this.snapshot);
    super.updateFromSnapshot();
  }

  protected sort(budgets: MonthlyBudget[]): MonthlyBudget[] {
    return budgets.sort((previous, budget) => {
      if (moment(budget.month).isBefore(previous.month)) {
        return -1;
      } else if (moment(budget.month).isAfter(previous.month)) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  private addSale(sale: Sale) {
    this.snapshot.filter(budget => {
      return moment(sale.soldAt).isSame(moment(budget.day), 'month');
    }).forEach(budget => {
      const goal = budget.goals.find(innerGoal => innerGoal.teamMemberId === sale.teamMemberId);

      if (goal) {
        if (sale.value) {
          goal.progress += sale.value;
        } else {
          goal.progress += 1;
        }

        this.updateFromSnapshot();
      }
    });
  }

  private removeSale(sale: Sale) {
    this.snapshot.filter(budget => {
      return moment(sale.soldAt).isSame(moment(budget.day), 'month');
    }).forEach(budget => {
      const goal = budget.goals.find(innerGoal => innerGoal.teamMemberId === sale.teamMemberId);

      if (goal) {
        if (sale.value) {
          goal.progress -= sale.value;
        } else {
          goal.progress -= 1;
        }

        this.updateFromSnapshot();
      }
    });
  }

  private addBudget(budget: MonthlyBudget) {
    this.snapshot.push(budget);
    this.updateFromSnapshot();
  }

  private updateBudget(budget: MonthlyBudget) {
    for (const key in this.snapshot) {
      if (this.snapshot[key].id === budget.id) {
        this.snapshot[key] = budget;
      }
    }

    this.updateFromSnapshot();
  }
}
