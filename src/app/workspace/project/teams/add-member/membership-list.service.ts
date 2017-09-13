import { Injectable, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';
import { Member } from '../../../../core/models/member.model';
import { Session } from '../../../../core/models/session.model';
import { TeamMember } from '../../../../core/models/team-member.model';

import { ObservableResourceList } from '../../../../core/observable-resource-list';
import { MemberService } from '../../../../core/services/member.service';
import { SocketApiService } from '../../../../core/socket-api.service';
import { ActiveMembershipService } from '../../../../organization/active-membership.service';
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
        this.pagination(this.memberService.get(membership.organizationId, limit, this.cursor))
          .subscribe(memberships => this.add(memberships));
      });
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
