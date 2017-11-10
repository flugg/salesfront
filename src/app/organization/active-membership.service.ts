import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Member } from '../core/models/member.model';
import { Organization } from '../core/models/organization.model';
import { ObservableResource } from '../core/observable-resource';
import { SocketApiService } from '../core/socket-api.service';
import { ActiveUserService } from '../organization-list/active-user.service';

@Injectable()
export class ActiveMembershipService extends ObservableResource implements OnDestroy {
  readonly membership: Observable<Member> = this.subject.asObservable();

  constructor(private route: ActivatedRoute,
              private sockets: SocketApiService,
              private activeUserService: ActiveUserService) {
    super();

    this.activeUserService.user.filter(user => user !== null).map(user => user.memberships.find(membership => {
      membership.user = user;
      return membership.organization.slug === this.route.snapshot.params['organization'];
    })).subscribe(membership => {
      if (membership) {
        this.set(membership);

        this.sockets.listenForOrganization(membership.organizationId, {
          'organiaztion_updated': organiaztion => this.updateOrganization(organiaztion)
        }, this);
      }
    });
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