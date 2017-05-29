import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ObservableResourceList } from '../../../../../../core/sockets/observable-resource-list';
import { SocketApiService } from '../../../../../../core/sockets/socket-api.service';
import { MembershipService } from '../../../../../shared/membership.service';
import { SelectedTeamService } from '../selected-team.service';
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
  constructor(private selectedTeam: SelectedTeamService,
              private sockets: SocketApiService,
              private membershipService: MembershipService) {
    super();

    this.selectedTeam.team.subscribe(team => {
      this.paginator.subscribe(limit => {
        this.pagination(this.membershipService.getForTeam(team.id, limit, this.cursor))
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
