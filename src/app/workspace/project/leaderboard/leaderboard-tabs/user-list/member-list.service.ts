import { Injectable, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/first';

import { ObservableResourceList } from '../../../../../core/observable-resource-list';
import { SocketApiService } from '../../../../../core/socket-api.service';
import { LeaderboardService } from '../../../../../core/services/leaderboard.service';
import { DatepickerService } from '../../shared/datepicker/datepicker.service';
import { ActiveProjectService } from '../../../../active-project.service';
import { Session } from '../../../../../core/models/session.model';
import { Member } from '../../../../../core/models/member.model';
import { Sale } from '../../../../../core/models/sale.model';

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
        this.leaderboardService.members(project.id, moment(after).startOf('day'), moment(before).endOf('day')).subscribe(members => {
          this.set(members.map(member => {
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
        return 0;
      }
    });
  }

  private calculatePosition(members: Member[], member: Member): number {
    const index = members.indexOf(member);
    return members.reduce((value, current) => {
      return members.indexOf(current) >= index || current.value === member.value ? value : value + 1;
    }, 1);
  }

  private addSale(sale: Sale) {
    const membership = this.snapshot.find(item => item.id === sale.memberId);
    membership.value += 1;
    this.updateFromSnapshot();
  }

  private removeSale(sale: Sale) {
    const membership = this.snapshot.find(item => item.id === sale.memberId);
    membership.value -= 1;
    this.updateFromSnapshot();
  }

  private setActiveSession(session: Session) {
    this.snapshot.find(item => item.id === session.memberId).activeSession = session;
    this.updateFromSnapshot();
  }

  private removeActiveSession(session: Session) {
    this.snapshot.find(item => item.id === session.memberId).activeSession = null;
    this.updateFromSnapshot();
  }
}
