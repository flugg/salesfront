import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { ObservableResourceList } from '../../../../../../../core/sockets/observable-resource-list';
import { UserListService } from '../../user-list/user-list.service';
import { Membership } from '../../../../../../shared/membership.model';

@Injectable()
export class MemberListService extends ObservableResourceList implements OnDestroy {

  /**
   * The observable list of teams.
   */
  readonly members: Observable<Membership[]> = this.subject.asObservable();

  /**
   * Constructs the service.
   */
  constructor(private route: ActivatedRoute,
              private userList: UserListService) {
    super();
    const teamId = route.snapshot.params['team'];
    this.userList.members.map(members => members.filter(member => {
      return member.sales.length ? member.sales.find(sale => sale.teamId === teamId) : this.isMemberOfTeam(member, teamId);
    })).subscribe(memberships => this.set(memberships.map(membership => {
      membership.position = this.calculatePosition(memberships, membership);
      return membership;
    })));
  }

  /**
   * Destroys the service.
   */
  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  /**
   * Calculates the position of the member.
   */
  private calculatePosition(memberships: Membership[], membership: Membership): number {
    const index = memberships.indexOf(membership);
    return memberships.reduce((value, current) => {
      return memberships.indexOf(current) >= index || current.sales.length === membership.sales.length ? value : value + 1;
    }, 1);
  }

  private isMemberOfTeam(membership: Membership, teamId: string): boolean {
    for (const teamMember of membership.teamMembers) {
      if (teamMember.teamId === teamId && ! teamMember.leftAt) {
        return true;
      }
    }

    return false;
  }
}
