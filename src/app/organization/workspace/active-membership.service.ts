import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ObservableResource } from '../../core/sockets/observable-resource';
import { MembershipListService } from '../shared/membership-list.service';
import { ActiveProjectService } from './shared/active-project.service';
import { Membership } from '../shared/membership.model';

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
              private membershipList: MembershipListService) {
    super();

    this.activeProject.project.subscribe(project => {
      this.membershipList.memberships.map(memberships => memberships.filter(membership => membership.projectId === project.id)[0])
        .subscribe(membership => this.set(membership));
    });
  }

  /**
   * Destroys the service.
   */
  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}