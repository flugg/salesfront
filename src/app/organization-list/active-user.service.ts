import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SocketApiService } from '../core/socket-api.service';
import { ObservableResource } from '../core/observable-resource';
import { UserService } from '../core/services/user.service';
import { User } from '../core/models/user.model';
import { Session } from '../core/models/session.model';
import { Member } from '../core/models/member.model';

@Injectable()
export class ActiveUserService extends ObservableResource implements OnDestroy {
  readonly user: Observable<User> = this.subject.asObservable();

  constructor(private userService: UserService,
              private sockets: SocketApiService) {
    super();

    this.userService.find('me', [
      'memberships.organization',
      'memberships.teamMembers.team',
      'memberships.activeSession'
    ]).subscribe(activeUser => {
      activeUser.memberships.forEach(membership => this.setTeamOnSession(membership));
      this.set(activeUser);

      this.sockets.listenForUser(activeUser.id, {
        'user_updated': user => this.set(user),
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
    const membership = this.snapshot.memberships.find(item => item.id === session.memberId);
    membership.activeSession = session;
    this.setTeamOnSession(membership);
    this.updateFromSnapshot();
  }

  private removeActiveSession(session: Session) {
    const membership = this.snapshot.memberships.find(item => item.id === session.memberId);
    membership.activeSession = null;
    this.updateFromSnapshot();
  }

  private setTeamOnSession(membership: Member) {
    if (membership.activeSession) {
      membership.activeSession.teamMember = membership.teamMembers.find(item => item.id === membership.activeSession.teamMemberId);
    } else {
      membership.activeSession = null;
    }
  }
}
