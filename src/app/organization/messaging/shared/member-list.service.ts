import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ObservableResourceList } from '../../../core/observable-resource-list';
import { SocketApiService } from '../../../core/socket-api.service';
import { MemberService } from '../../../core/services/member.service';
import { Member } from '../../../core/models/member.model';
import { ActiveMembershipService } from '../../active-membership.service';

@Injectable()
export class MemberListService extends ObservableResourceList implements OnDestroy {
  readonly members: Observable<Member[]> = this.subject.asObservable();

  constructor(private sockets: SocketApiService,
              private activeMembershipService: ActiveMembershipService,
              private memberService: MemberService) {
    super();

    this.activeMembershipService.membership.subscribe(membership => {
      this.paginator.subscribe(limit => {
        this.pagination(this.memberService.get(membership.organizationId, limit, this.cursor)).subscribe(users => this.add(users));
      });
    });
  }

  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }
}