import { Injectable, OnDestroy } from '@angular/core';

import 'rxjs/add/operator/distinctUntilChanged';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../core/auth/auth.service';
import { Member } from '../core/models/member.model';
import { Session } from '../core/models/session.model';
import { TeamMember } from '../core/models/team-member.model';
import { User } from '../core/models/user.model';
import { ObservableResource } from '../core/observable-resource';
import { UserService } from '../core/services/user.service';
import { SocketApiService } from '../core/socket-api.service';

@Injectable()
export class ActiveUserService extends ObservableResource implements OnDestroy {
  readonly user: Observable<User | null> = this.subject.asObservable();

  constructor(private userService: UserService,
              private authService: AuthService,
              private sockets: SocketApiService) {
    super();

    this.socketSubscription = this.sockets.connects.subscribe(() => {
      this.authService.authenticated.subscribe(authenticated => {
        this.sockets.stopListening(this);

        if (! authenticated) {
          this.set(null);
          return;
        }

        this.userService.find('me', [
          'memberships.organization.contractTemplates',
          'memberships.teamMembers.team.project',
          'memberships.activeSession'
        ]).subscribe(activeUser => {
          activeUser.memberships.forEach(membership => this.setTeamOnSession(membership));
          this.set(activeUser);

          this.sockets.listenForUser(activeUser.id, {
            'user_updated': user => this.set(user),
            'member_removed': membership => this.removeMembership(membership),
            'member_updated': membership => this.updateMembership(membership),
            'team_member_added': teamMember => this.addTeamMember(teamMember),
            'team_member_removed': teamMember => this.removeTeamMember(teamMember),
            'clocked_in': session => this.setActiveSession(session),
            'clocked_out': session => this.removeActiveSession(session)
          }, this);
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }

  private removeMembership(membership: Member) {
    this.snapshot.memberships = this.snapshot.memberships.filter(item => item.id !== membership.id);
    this.updateFromSnapshot();
  }

  private updateMembership(membership: Member) {
    this.snapshot.memberships = this.snapshot.memberships.map(item => item.id === membership.id ? membership : item);
    this.updateFromSnapshot();
  }

  private addTeamMember(teamMember: TeamMember) {
    this.snapshot.memberships = this.snapshot.memberships.map(membership => {
      if (membership.id !== teamMember.memberId) {
        return membership;
      }
      return { ...membership, teamMembers: [...membership.teamMembers, teamMember] };
    });
    this.updateFromSnapshot();
  }

  private removeTeamMember(teamMember: TeamMember) {
    this.snapshot.memberships = this.snapshot.memberships.map(membership => {
      if (membership.id !== teamMember.memberId) {
        return membership;
      }
      return { ...membership, teamMembers: membership.teamMembers.filter(item => item.id !== teamMember.id) };
    });
    this.updateFromSnapshot();
  }

  private setActiveSession(session: Session) {
    const membership = this.snapshot.memberships.find(item => item.id === session.memberId);
    if (membership) {
      membership.activeSession = session;
      this.setTeamOnSession(membership);
      this.updateFromSnapshot();
    }
  }

  private removeActiveSession(session: Session) {
    const membership = this.snapshot.memberships.find(item => item.id === session.memberId);
    if (membership) {
      membership.activeSession = null;
      this.updateFromSnapshot();
    }
  }

  private setTeamOnSession(membership: Member) {
    if (membership.activeSession) {
      membership.activeSession.teamMember = membership.teamMembers.find(item => item.id === membership.activeSession.teamMemberId);
    } else {
      membership.activeSession = null;
    }
  }
}
