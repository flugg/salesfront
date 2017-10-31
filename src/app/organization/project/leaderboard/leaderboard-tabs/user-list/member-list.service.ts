import { Injectable, OnDestroy } from '@angular/core';
import * as moment from 'moment';

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Member } from '../../../../../core/models/member.model';
import { Sale } from '../../../../../core/models/sale.model';
import { Session } from '../../../../../core/models/session.model';
import { ObservableResourceList } from '../../../../../core/observable-resource-list';
import { LeaderboardService } from '../../../../../core/services/leaderboard.service';
import { SocketApiService } from '../../../../../core/socket-api.service';
import { ActiveProjectService } from '../../../../active-project.service';
import { DatepickerService } from '../../../../shared/datepicker/datepicker.service';

@Injectable()
export class MemberListService extends ObservableResourceList implements OnDestroy {
  readonly members: Observable<Member[]> = this.subject.asObservable();

  constructor(private sockets: SocketApiService,
              private activeProject: ActiveProjectService,
              private leaderboardService: LeaderboardService,
              private datepicker: DatepickerService) {
    super();

    this.activeProject.project.first().subscribe(project => {
      this.datepicker.range.distinctUntilChanged().subscribe(range => {
        const [after, before] = range;
        this.leaderboardService.members(project.id, moment(after).startOf('day'), moment(before).endOf('day')).map(members => {
          return members.filter(member => member.value || !member.deletedAt);
        }).subscribe(members => {
          this.set(this.sort(members).map(member => {
            member.position = this.calculatePosition(members, member);
            return member;
          }));
        });
      });

      this.sockets.listenForProject(project.id, {
        'sale_registered': sale => this.addSale(sale),
        'sale_deleted': sale => this.removeSale(sale),
        'clocked_in': session => this.setActiveSession(session),
        'clocked_out': session => this.removeActiveSession(session)
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

  protected sort(members: Member[]): Member[] {
    return members.sort((previous, current) => {
      if (previous.value > current.value) {
        return -1;
      } else if (previous.value < current.value) {
        return 1;
      } else {
        return previous.user.name > current.user.name ? 1 : -1;
      }
    });
  }

  private calculatePosition(members: Member[], member: Member): number {
    let previous = 0;
    const index = members.indexOf(member);
    return members.reduce((value, current) => {
      const position = members.indexOf(current) >= index || current.value === member.value || current.value === previous ? value : value + 1;
      previous = current.value;
      return position;
    }, 1);
  }

  private addSale(sale: Sale) {
    const membership = this.snapshot.find(item => item.id === sale.memberId);

    if (membership) {
      if (sale.value) {
        membership.value += sale.value;
      } else {
        membership.value += 1;
      }

      this.updateFromSnapshot();
    }
  }

  private removeSale(sale: Sale) {
    const membership = this.snapshot.find(item => item.id === sale.memberId);

    if (membership) {
      if (sale.value) {
        membership.value -= sale.value;
      } else {
        membership.value -= 1;
      }

      this.updateFromSnapshot();
    }
  }

  private setActiveSession(session: Session) {
    const membership = this.snapshot.find(item => item.id === session.memberId);

    if (membership) {
      membership.activeSession = session;
      this.updateFromSnapshot();
    }
  }

  private removeActiveSession(session: Session) {
    const membership = this.snapshot.find(item => item.id === session.memberId);

    if (membership) {
      membership.activeSession = null;
      this.updateFromSnapshot();
    }
  }
}
