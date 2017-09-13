import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Member } from '../../../../../core/models/member.model';
import { Session } from '../../../../../core/models/session.model';
import { User } from '../../../../../core/models/user.model';

import { ObservableResourceList } from '../../../../../core/observable-resource-list';
import { MemberService } from '../../../../../core/services/member.service';
import { SocketApiService } from '../../../../../core/socket-api.service';
import { ActiveMembershipService } from '../../../../../organization/active-membership.service';

@Injectable()
export class MemberListService extends ObservableResourceList implements OnDestroy {
  readonly members: Observable<Member[]> = this.subject.asObservable();

  constructor(private sockets: SocketApiService,
              private activeMembershipService: ActiveMembershipService,
              private memberService: MemberService) {
    super();

    this.activeMembershipService.membership.first().subscribe(membership => {
      this.paginator.subscribe(limit => {
        this.pagination(this.memberService.get(membership.organizationId, limit, this.cursor))
          .subscribe(members => this.add(members));
      });

      this.sockets.listenForOrganization(membership.organizationId, {
        'user_updated': user => this.updateUser(user),
        'member_updated': member => this.setMembership(member),
        'member_removed': member => this.setMembership(member),
        'clocked_in': session => this.setActiveSession(session),
        'clocked_out': session => this.removeActiveSession(session)
      }, this);
    });
  }

  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }

  private setMembership(membership: Member) {
    this.snapshot = this.snapshot.map(item => {
      return item.id === membership.id ? membership : item;
    });

    this.updateFromSnapshot();
  }

  private setActiveSession(session: Session) {
    const member = this.snapshot.find(item => item.id === session.memberId);

    if (member) {
      member.activeSession = session;
      this.updateFromSnapshot();
    }
  }

  private removeActiveSession(session: Session) {
    const member = this.snapshot.find(item => item.id === session.memberId);

    if (member) {
      member.activeSession = null;
      this.updateFromSnapshot();
    }
  }

  private updateUser(user: User) {
    const member = this.snapshot.find(item => item.userId === user.id);

    if (member) {
      member.user = user;
      this.updateFromSnapshot();
    }
  }
}
