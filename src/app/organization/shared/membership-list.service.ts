import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ObservableResourceList } from '../../core/sockets/observable-resource-list';
import { SocketApiService } from '../../core/sockets/socket-api.service';
import { MembershipService } from './membership.service';
import { Membership } from './membership.model';

@Injectable()
export class MembershipListService extends ObservableResourceList implements OnDestroy {

  /**
   * The observable list of memberships.
   */
  readonly memberships: Observable<Membership[]> = this.subject.asObservable();

  /**
   * Constructs the service.
   */
  constructor(private sockets: SocketApiService,
              private membershipService: MembershipService) {
    super();

    this.paginator.subscribe(limit => {
      this.pagination(this.membershipService.getForOrganization('1', limit, this.cursor)).subscribe(memberships => this.add(memberships));
    });
  }

  /**
   * Destroys the service.
   */
  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }
}