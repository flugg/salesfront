import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ObservableResource } from '../core/observable-resource';
import { ActiveUserService } from '../organization-list/active-user.service';
import { Member } from '../core/models/member.model';
import { SocketApiService } from '../core/socket-api.service';
import { Organization } from '../core/models/organization.model';

@Injectable()
export class ActiveMembershipService extends ObservableResource implements OnDestroy {
  readonly membership: Observable<Member> = this.subject.asObservable();

  constructor(private route: ActivatedRoute,
              private sockets: SocketApiService,
              private activeUserService: ActiveUserService) {
    super();

    this.activeUserService.user.map(user => user.memberships.find(membership => {
      membership.user = user;
      return membership.organizationId === this.route.snapshot.params['organization'];
    })).subscribe(membership => this.set(membership));

    this.sockets.listenForOrganization(this.route.snapshot.params['organization'], {
      'organiaztion_updated': organiaztion => this.updateOrganization(organiaztion),
    }, this);
  }

  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }

  private updateOrganization(organization: Organization): void {
    this.snapshot.organization = { ...this.snapshot.organization, ...organization };
    this.updateFromSnapshot();
  }
}