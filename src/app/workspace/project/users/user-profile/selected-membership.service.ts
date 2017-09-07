import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { ObservableResource } from '../../../../core/observable-resource';
import { SocketApiService } from '../../../../core/socket-api.service';
import { MemberService } from '../../../../core/services/member.service';
import { User } from '../../../../core/models/user.model';
import { Member } from '../../../../core/models/member.model';

@Injectable()
export class SelectedMembershipService extends ObservableResource implements OnDestroy {
  readonly membership: Observable<Member> = this.subject.asObservable();

  constructor(private route: ActivatedRoute,
              private sockets: SocketApiService,
              private memberService: MemberService) {
    super();

    this.route.params.subscribe(params => {
      this.memberService.find(params['member']).subscribe(member => {
        this.set(member);

        this.sockets.listenForOrganization(member.organizationId, {
          'user_updated': user => this.updateUser(user),
          'member_updated': membership => this.updateMembership(membership),
          'member_removed': membership => this.updateMembership(membership)
        }, this);
      });
    });
  }

  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }

  private updateMembership(membership: Member) {
    if (membership.id === this.route.snapshot.params['member']) {
      this.set(membership);
    }
  }

  private updateUser(user: User) {
    if (user.id === this.snapshot.userId) {
      this.snapshot.user = user;

      this.updateFromSnapshot();
    }
  }
}