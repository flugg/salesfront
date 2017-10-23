import { Injectable } from '@angular/core';
import { Moment } from 'moment';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Budget } from '../models/budget.model';
import { DailyBudget } from '../models/daily-budget.model';
import { PaginationResponse } from '../pagination-response';
import { RestApiService } from '../rest-api.service';
import { MonthlyBudget } from '../models/monthly-budget.model';

@Injectable()
export class BudgetService {
  constructor(private api: RestApiService) {}

  paginate(projectId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`projects/${projectId}/budgets`, cursor, limit);
  }

  paginateDaily(projectId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`projects/${projectId}/daily-budgets`, cursor, limit);
  }

  paginateMonthly(projectId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`projects/${projectId}/monthly-budgets`, cursor, limit);
  }

  listDaily(projectId: string, after?: Moment, before?: Moment): Observable<DailyBudget[]> {
    return this.api.get(`projects/${projectId}/daily-budgets`, {
      after: after.toISOString(),
      before: before.toISOString()
    }).map(response => response.data);
  }

  listMonthly(projectId: string, after?: Moment, before?: Moment): Observable<MonthlyBudget[]> {
    return this.api.get(`projects/${projectId}/monthly-budgets`, {
      after: after.toISOString(),
      before: before.toISOString()
    }).map(response => response.data);
  }

  find(id: string): Observable<Budget> {
    return this.api.get(`budgets/${id}`, { include: 'goals.teamMember.team,goals.teamMember.member' }).map(response => response.data);
  }

  findDaily(id: string): Observable<DailyBudget> {
    return this.api.get(`daily-budgets/${id}`, { include: 'goals.teamMember.team,goals.teamMember.member' }).map(response => response.data);
  }

  findMonthly(id: string): Observable<MonthlyBudget> {
    return this.api.get(`monthly-budgets/${id}`, { include: 'goals.teamMember.team,goals.teamMember.member' }).map(response => response.data);
  }

  create(projectId: string, name: string, startsAt: Moment, endsAt: Moment) {
    return this.api.post(`projects/${projectId}/budgets`, { name, startsAt, endsAt }).then(response => response.data);
  }

  createDaily(projectId: string, day: Moment) {
    return this.api.post(`projects/${projectId}/daily-budgets`, { day }).then(response => response.data);
  }

  createMonthly(projectId: string, month: Moment) {
    return this.api.post(`projects/${projectId}/monthly-budgets`, { month }).then(response => response.data);
  }

  createUserBudget(budgetId: string) {
    return this.api.post(`budgets/${budgetId}/user-budgets`).then(response => response.data);
  }

  createDailyUserBudget(budgetId: string) {
    return this.api.post(`daily-budgets/${budgetId}/user-budgets`).then(response => response.data);
  }

  createMonthlyUserBudget(budgetId: string) {
    return this.api.post(`monthly-budgets/${budgetId}/user-budgets`).then(response => response.data);
  }

  setBudgetGoals(budgetId: string, teamMembers: any) {
    return this.api.post(`budgets/${budgetId}/budget-goals`, {
      teamMembers: teamMembers.filter(teamMember => teamMember.value > 0)
    }).then(response => response.data);
  }
}
