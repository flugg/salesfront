import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { ObservableResourceList } from '../../core/sockets/observable-resource-list';
import { SocketApiService } from '../../core/sockets/socket-api.service';
import { MembershipService } from './membership.service';
import { Membership } from './membership.model';
import { ActiveUserService } from '../active-user.service';
import { Session } from './session.model';

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
              private activeUser: ActiveUserService,
              private membershipService: MembershipService) {
    super();

    this.paginator.subscribe(limit => {
      this.pagination(this.membershipService.getForOrganization('1', limit, this.cursor)).subscribe(memberships => this.add(memberships));
    });

    this.activeUser.user.first().subscribe(user => {
      this.sockets.listenForUser(user.id, {
        'clocked_in': (session) => this.setActiveSession(session),
        'clocked_out': (session) => this.removeActiveSession(session),
      }, this);
    });
  }

  /**
   * Destroys the service.
   */
  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }

  /**
   * Adds an active session to a membership.
   */
  private setActiveSession(session: Session) {
    console.log(1);
    const membership = this.snapshot.find(item => item.id === session.membershipId);
    membership.activeSession = session;
    this.updateFromSnapshot();
  }

  /**
   * Removes an active session from a membership.
   */
  private removeActiveSession(session: Session) {
    console.log(2);
    const membership = this.snapshot.find(item => item.id === session.membershipId);
    membership.activeSession = null;
    this.updateFromSnapshot();
  }
}