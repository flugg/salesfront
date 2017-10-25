import { Injectable, OnDestroy } from '@angular/core';

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';

import { Team } from '../../../../../../core/models/team.model';
import { ObservableResourceList } from '../../../../../../core/observable-resource-list';
import { SocketApiService } from '../../../../../../core/socket-api.service';
import { SelectedBudgetService } from '../selected-budget.service';

@Injectable()
export class TeamListService extends ObservableResourceList implements OnDestroy {
  readonly teams: Observable<Team[]> = this.subject.asObservable();

  constructor(private sockets: SocketApiService,
              private selectedBudgetService: SelectedBudgetService) {
    super();

    this.selectedBudgetService.budget.subscribe(budget => {
      const teams = [];
      budget.goals.forEach(goal => {
        const team = teams.find(item => item.id === goal.teamMember.teamId);
        if (team) {
          team.value += goal.progress;
          team.budget += goal.value;
        } else {
          teams.push({
            ...goal.teamMember.team, ...{
              value: goal.progress,
              budget: goal.value
            }
          });
        }
      });
      this.set(teams);
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

  protected sort(teams: Team[]): Team[] {
    return teams.sort((previous, current) => {
      if (this.calculatePercent(previous) > this.calculatePercent(current)) {
        return -1;
      } else if (this.calculatePercent(previous) < this.calculatePercent(current)) {
        return 1;
      } else {
        return previous.budget < current.budget ? 1 : -1;
      }
    });
  }

  protected calculatePercent(team: Team): number {
    if (team.budget === 0) {
      return team.value > 0 ? 100 : 0;
    }

    return Math.floor(team.value * 100 / team.budget);
  }
}
