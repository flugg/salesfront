import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { ObservableResourceList } from '../../../../../../core/sockets/observable-resource-list';
import { SocketApiService } from '../../../../../../core/sockets/socket-api.service';
import { MembershipService } from '../../../../../shared/membership.service';
import { ActiveProjectService } from '../../../../shared/active-project.service';
import { SalesListService } from '../sales-list.service';
import { Membership } from '../../../../../shared/membership.model';

@Injectable()
export class UserListService extends ObservableResourceList implements OnDestroy {

  /**
   * The observable list of memberships.
   */
  readonly members: Observable<Membership[]> = this.subject.asObservable();

  /**
   * Constructs the service.
   */
  constructor(private sockets: SocketApiService,
              private activeProject: ActiveProjectService,
              private salesList: SalesListService,
              private membershipService: MembershipService) {
    super();

    this.activeProject.project.first().subscribe(project => {
      this.membershipService.getAllForProject(project.id).subscribe(memberships => {
        this.salesList.sales.subscribe(sales => {
          memberships = this.sortTeams(memberships.map(membership => {
            membership.sales = sales.filter(sale => sale.membershipId === membership.id);
            return membership;
          }));
          this.set(memberships.map(membership => {
            membership.position = this.calculatePosition(memberships, membership);
            return membership;
          }));
        });
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

  /**
   * Sorts the teams based on sales.
   */
  protected sortTeams(teams: Membership[]): Membership[] {
    return teams.sort((previous, current) => {
      if (previous.sales.length > current.sales.length) {
        return -1;
      } else if (previous.sales.length < current.sales.length) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  /**
   * Calculates the position of the member.
   */
  private calculatePosition(memberships: Membership[], membership: Membership): number {
    const index = memberships.indexOf(membership);
    return memberships.reduce((value, current) => {
      return memberships.indexOf(current) >= index || current.sales.length === membership.sales.length ? value : value + 1;
    }, 1);
  }
}
