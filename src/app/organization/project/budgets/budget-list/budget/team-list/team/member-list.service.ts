import { Injectable, OnDestroy } from '@angular/core';

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';

import { Member } from '../../../../../../../core/models/member.model';
import { ObservableResourceList } from '../../../../../../../core/observable-resource-list';
import { SocketApiService } from '../../../../../../../core/socket-api.service';
import { SelectedBudgetService } from '../../selected-budget.service';
import { SelectedTeamService } from './selected-team.service';

@Injectable()
export class MemberListService extends ObservableResourceList implements OnDestroy {
  readonly members: Observable<Member[]> = this.subject.asObservable();

  constructor(private sockets: SocketApiService,
              private selectedTeamService: SelectedTeamService,
              private selectedBudgetService: SelectedBudgetService) {
    super();

    this.selectedTeamService.team.subscribe(team => {
      this.selectedBudgetService.budget.subscribe(budget => {
        const members = [];
        budget.goals.filter(goal => {
          return goal.teamMember.teamId === team.id;
        }).forEach(goal => {
          const member = members.find(item => item.id === goal.teamMember.memberId);
          if (member) {
            member.value += goal.progress;
            member.budget += goal.value;
          } else {
            members.push({
              ...goal.teamMember.member, ...{
                value: goal.progress,
                budget: goal.value
              }
            });
          }
        });

        this.set(members);
      });
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

  protected sort(members: Member[]): Member[] {
    return members.sort((previous, current) => {
      if (this.calculatePercent(previous) > this.calculatePercent(current)) {
        return -1;
      } else if (this.calculatePercent(previous) < this.calculatePercent(current)) {
        return 1;
      } else {
        return previous.budget > current.budget ? 1 : -1;
      }
    });
  }

  protected calculatePercent(member: Member): number {
    if (member.budget === 0) {
      return member.value > 0 ? 100 : 0;
    }

    return Math.floor(member.value * 100 / member.budget);
  }
}
