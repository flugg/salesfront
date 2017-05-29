import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { ObservableResourceList } from '../../../../../core/sockets/observable-resource-list';
import { MembershipService } from '../../../../shared/membership.service';
import { ActiveProjectService } from '../../../shared/active-project.service';
import { Membership } from '../../../../shared/membership.model';

@Injectable()
export class MembershipListService extends ObservableResourceList implements OnDestroy {

  /**
   * The observable list of memberships.
   */
  readonly members: Observable<Membership[]> = this.subject.asObservable();

  /**
   * Constructs the service.
   */
  constructor(private activeProject: ActiveProjectService,
              private membershipService: MembershipService) {
    super();

    this.activeProject.project.first().subscribe(project => {
      this.membershipService.getAllForProject(project.id).subscribe(users => this.set(users));
    });
  }

  /**
   * Destroys the service.
   */
  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}