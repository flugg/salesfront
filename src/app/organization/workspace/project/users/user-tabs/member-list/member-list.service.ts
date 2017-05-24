import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ObservableResourceList } from '../../../../../../core/sockets/observable-resource-list';
import { SocketApiService } from '../../../../../../core/sockets/socket-api.service';
import { ActiveProjectService } from '../../../../shared/active-project.service';
import { MembershipService } from '../../../../../shared/membership.service';
import { Membership } from '../../../../../shared/membership.model';

@Injectable()
export class MemberListService extends ObservableResourceList implements OnDestroy {

  /**
   * The observable list of memberships.
   */
  readonly memberships: Observable<Membership[]> = this.subject.asObservable();

  /**
   * Constructs the service.
   */
  constructor(private activeProject: ActiveProjectService,
              private sockets: SocketApiService,
              private membershipService: MembershipService) {
    super();

    this.activeProject.project.first().subscribe(project => {
      this.paginator.subscribe(limit => {
        this.pagination(this.membershipService.getForProject(project.id, limit, this.cursor))
          .subscribe(memberships => this.add(memberships));
      });
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
