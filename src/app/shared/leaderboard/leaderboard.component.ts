import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { slideIn } from '../../core/animations/slide-in';
import { Budget } from '../../core/models/budget.model';
import { DailyBudget } from '../../core/models/daily-budget.model';
import { Member } from '../../core/models/member.model';
import { MonthlyBudget } from '../../core/models/monthly-budget.model';
import { Project } from '../../core/models/project.model';
import { Team } from '../../core/models/team.model';

@Component({
  selector: 'vmo-leaderboard',
  templateUrl: 'leaderboard.component.html',
  styleUrls: ['leaderboard.component.scss'],
  animations: [slideIn()]
})
export class LeaderboardComponent implements OnInit {
  @Input() project: Project;
  @Input() items: Member[] | Team[];
  @Input() type = 'users';
  @Input() avatar = true;
  @Input() budget: Budget | DailyBudget | MonthlyBudget | null = null;
  @Input() budgetType: 'daily' | 'monthly' | 'custom' = 'custom';

  loading = true;
  count = 10;
  countComplete = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.count = Math.min(this.count, this.items.length);
    setTimeout(() => this.loading = false, 1);
  }

  onClickBar(item: Member | Team): void {
    if (this.type === 'teams') {
      if (this.budget) {
        this.router.navigate([this.project.organizationId, 'projects', this.project.id, 'budgets', this.budgetType, this.budget.id, 'teams', item.id]);
      } else if (this.avatar) {
        this.router.navigate([this.project.organizationId, 'projects', this.project.id, 'leaderboard', 'teams', item.id]);
      }
    }
  }

  calculatePercent(item: Member | Team): number {
    if (this.budget) {
      return Math.round(item.value * 100 / item.budget);
    }

    if (this.items[0].value) {
      return item.value * 100 / this.items[0].value;
    }
  }

  calculateWidth(item: Member | Team): string {
    const percent = this.calculatePercent(item);

    if (percent) {
      return Math.min(100, percent) + '%';
    }

    return '';
  }

  loadAll(): void {
    this.count = this.items.length;
  }

  trackById(index, item) {
    return item.id;
  }
}
