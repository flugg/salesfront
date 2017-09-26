import { Injectable, OnDestroy } from '@angular/core';

import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Member } from '../../../../core/models/member.model';
import { ObservableResourceList } from '../../../../core/observable-resource-list';
import { MemberService } from '../../../../core/services/member.service';
import { ActiveMembershipService } from '../../../active-membership.service';

@Injectable()
export class MemberListService extends ObservableResourceList implements OnDestroy {
  readonly members: Observable<Member[]> = this.subject.asObservable();

  constructor(private activeMemberService: ActiveMembershipService,
              private memberService: MemberService) {
    super();

    this.activeMemberService.membership.first().subscribe(member => {
      this.memberService.list(member.organizationId).map(members => {
        return members.filter(item => !item.deletedAt);
      }).subscribe(members => {
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