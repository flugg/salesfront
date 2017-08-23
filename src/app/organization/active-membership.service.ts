import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';

import { ObservableResource } from '../core/observable-resource';
import { ActiveUserService } from '../organization-list/active-user.service';
import { Member } from '../core/models/member.model';

@Injectable()
export class ActiveMembershipService extends ObservableResource implements OnDestroy {
  readonly membership: Observable<Member> = this.subject.asObservable();

  constructor(private route: ActivatedRoute,
              private activeUserService: ActiveUserService) {
    super();

    this.activeUserService.user.map(user => user.memberships.find(membership => {
      membership.user = user;
      return membership.organizationId === this.route.snapshot.params['organization'];
    })).first().subscribe(membership => this.set(membership));
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}