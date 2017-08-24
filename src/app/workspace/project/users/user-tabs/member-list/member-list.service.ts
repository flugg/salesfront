import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ObservableResourceList } from '../../../../../core/observable-resource-list';
import { SocketApiService } from '../../../../../core/socket-api.service';
import { MemberService } from '../../../../../core/services/member.service';
import { ActiveMembershipService } from '../../../../../organization/active-membership.service';
import { Member } from '../../../../../core/models/member.model';
import { Session } from '../../../../../core/models/session.model';
import { User } from '../../../../../core/models/user.model';

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
        'clocked_in': session => this.setActiveSession(session),
        'clocked_out': session => this.removeActiveSession(session)
      }, this);
    });
  }

  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }

  private setActiveSession(session: Session) {
    this.snapshot.find(item => item.id === session.memberId).activeSession = session;
    this.updateFromSnapshot();
  }

  private removeActiveSession(session: Session) {
    this.snapshot.find(item => item.id === session.memberId).activeSession = null;
    this.updateFromSnapshot();
  }

  private updateUser(user: User) {
    this.snapshot.find(item => item.userId === user.id).user = user;
    this.updateFromSnapshot();
  }
}
