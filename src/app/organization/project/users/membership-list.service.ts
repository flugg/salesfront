import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ObservableResourceList } from '../../../core/sockets/observable-resource-list';
import { SocketApiService } from '../../../core/sockets/socket-api.service';
import { MembershipService } from './membership.service';
import { Membership } from '../shared/membership.model';

@Injectable()
export class MembershipListService extends ObservableResourceList implements OnDestroy {

  /**
   * The observable list of memberships.
   */
  readonly memberships: Observable<Membership[]> = this.subject.asObservable();

  /**
   * Constructs the service.
   */
  constructor(private route: ActivatedRoute,
              private sockets: SocketApiService,
              private membershipService: MembershipService) {
    super();

    this.paginator.subscribe(limit => {
      this.pagination(this.membershipService.get(this.route.snapshot.params.id, limit, this.cursor))
        .subscribe(memberships => this.add(memberships));
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