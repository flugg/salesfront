import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ObservableResource } from '../../core/sockets/observable-resource';
import { MembershipListService } from '../shared/membership-list.service';
import { ActiveProjectService } from './shared/active-project.service';
import { Membership } from '../shared/membership.model';
import { SocketApiService } from '../../core/sockets/socket-api.service';
import { User } from '../shared/user.model';

@Injectable()
export class ActiveMembershipService extends ObservableResource implements OnDestroy {

  /**
   * The observable active membership.
   */
  readonly membership: Observable<Membership> = this.subject.asObservable();

  /**
   * Constructs the service.
   */
  constructor(private activeProject: ActiveProjectService,
              private sockets: SocketApiService,
              private membershipList: MembershipListService) {
    super();

    this.activeProject.project.subscribe(project => {
      this.membershipList.memberships.map(memberships => memberships.filter(membership => membership.projectId === project.id)[0])
        .subscribe(membership => this.set(membership));
    });

    this.activeProject.project.first().subscribe(project => {
      this.sockets.listenForProject(project.id, {
        'user_updated': user => this.updateUser(user)
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
   * Updates a user in the list.
   */
  private updateUser(user: User) {
    if (user.id === this.snapshot.userId) {
      this.snapshot.user = user;

      this.updateFromSnapshot();
    }
  }
}