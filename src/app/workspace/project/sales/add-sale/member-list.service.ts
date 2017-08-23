import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { ObservableResourceList } from '../../../../core/observable-resource-list';
import { MemberService } from '../../../../core/services/member.service';
import { ActiveMembershipService } from '../../../../organization/active-membership.service';
import { Member } from '../../../../core/models/member.model';

@Injectable()
export class MemberListService extends ObservableResourceList implements OnDestroy {
  readonly members: Observable<Member[]> = this.subject.asObservable();

  constructor(private activeMemberService: ActiveMembershipService,
              private memberService: MemberService) {
    super();

    this.activeMemberService.membership.first().subscribe(member => {
      this.memberService.list(member.organizationId).subscribe(members => {
        if (member.user.isAdmin || this.isTeamLeader(member)) {
          this.set(members);
        } else {
          this.set(members.filter(membership => membership.id === member.id));
        }
      });
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  private isTeamLeader(member: Member): boolean {
    for (const teamMember of member.teamMembers) {
      if (teamMember.isLeader) {
        return true;
      }
    }

    return false;
  }
}