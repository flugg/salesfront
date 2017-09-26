import { Injectable, OnDestroy } from '@angular/core';

import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Member } from '../../../../core/models/member.model';
import { Session } from '../../../../core/models/session.model';
import { TeamMember } from '../../../../core/models/team-member.model';
import { ObservableResourceList } from '../../../../core/observable-resource-list';
import { MemberService } from '../../../../core/services/member.service';
import { SocketApiService } from '../../../../core/socket-api.service';
import { ActiveMembershipService } from '../../../active-membership.service';
import { ActiveProjectService } from '../../../active-project.service';

@Injectable()
export class MembershipListService extends ObservableResourceList implements OnDestroy {
  readonly memberships: Observable<Member[]> = this.subject.asObservable();

  constructor(private activeProjectService: ActiveProjectService,
              private activeMembershipService: ActiveMembershipService,
              private sockets: SocketApiService,
              private memberService: MemberService) {
    super();

    this.activeMembershipService.membership.first().subscribe(membership => {
      this.paginator.subscribe(limit => {
        this.pagination(this.memberService.get(membership.organizationId, limit, this.cursor)).map(members => {
          return members.filter(item => !item.deletedAt);
        }).subscribe(memberships => this.add(memberships));
      });

      this.sockets.listenForOrganization(membership.organizationId, {
        'member_removed': member => this.removeMembership(member),
        'member_updated': member => this.updateMembership(member)
      }, this);
    });

    this.activeProjectService.project.first().subscribe(project => {
      this.sockets.listenForProject(project.id, {
        'team_member_added': member => this.updateTeamMember(member),
        'team_member_removed': member => this.updateTeamMember(member),
        'clocked_in': session => this.setActiveSession(session),
        'clocked_out': session => this.removeActiveSession(session)
      }, this);
    });
  }

  private removeMembership(membership: Member) {
    this.snapshot = this.snapshot.filter(item => item.id !== membership.id);
    this.updateFromSnapshot();
  }

  private updateMembership(membership: Member) {
    this.snapshot = [...this.snapshot, membership];
    this.updateFromSnapshot();
  }

  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }

  private updateTeamMember(member: TeamMember) {
    const membership = this.snapshot.find(item => item.id === member.memberId);

    if (membership) {
      membership.teamMembers = membership.teamMembers.filter(item => item.id !== member.id);

      if (!member.leftAt) {
        membership.teamMembers.push(member);
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
