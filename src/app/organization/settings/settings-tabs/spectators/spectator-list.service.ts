import { Injectable, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Member } from '../../../../core/models/member.model';
import { User } from '../../../../core/models/user.model';
import { ObservableResourceList } from '../../../../core/observable-resource-list';
import { MemberService } from '../../../../core/services/member.service';
import { SocketApiService } from '../../../../core/socket-api.service';
import { ActiveMembershipService } from '../../../active-membership.service';

@Injectable()
export class SpectatorListService extends ObservableResourceList implements OnDestroy {
  readonly spectators: Observable<Member[]> = this.subject.asObservable();

  constructor(private sockets: SocketApiService,
              private activeMembershipService: ActiveMembershipService,
              private memberService: MemberService) {
    super();

    this.socketSubscription = this.sockets.connects.subscribe(() => {
      this.cursor = null;
      this.snapshot = [];
      this.sockets.stopListening(this);

      this.activeMembershipService.membership.first().subscribe(membership => {
        this.paginator.subscribe(limit => {
          this.pagination(this.memberService.spectators(membership.organizationId, limit, this.cursor))
            .subscribe(members => this.add(members));
        });

        this.sockets.listenForOrganization(membership.organizationId, {
          'user_updated': user => this.updateUser(user),
          'member_created': member => this.addMembership(member),
          'member_updated': member => this.setMembership(member),
          'member_removed': member => this.removeMembership(member)
        }, this);
      });
    });
  }

  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }

  private updateUser(user: User) {
    const member = this.snapshot.find(item => item.userId === user.id);

    if (member) {
      member.user = user;
      this.updateFromSnapshot();
    }
  }

  private addMembership(membership: Member) {
    if (membership.isSpectator) {
      this.memberService.findSpectator(membership.id).subscribe(spectator => {
        this.snapshot = [...this.snapshot, spectator];
        this.updateFromSnapshot();
      });
    }
  }

  private setMembership(membership: Member) {
    this.memberService.findSpectator(membership.id).subscribe(spectator => {
      this.snapshot = this.snapshot.map(item => {
        return item.id === spectator.id ? spectator : item;
      });
      this.updateFromSnapshot();
    });
  }

  private removeMembership(membership: Member) {
    this.snapshot = this.snapshot.filter(item => {
      return item.id !== membership.id;
    });

    this.updateFromSnapshot();
  }
}
