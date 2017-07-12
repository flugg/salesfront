import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';

import { ObservableResourceList } from '../../../../../../core/sockets/observable-resource-list';
import { SocketApiService } from '../../../../../../core/sockets/socket-api.service';
import { MembershipService } from '../../../../../shared/membership.service';
import { ActiveProjectService } from '../../../../shared/active-project.service';
import { SalesListService } from '../sales-list.service';
import { Membership } from '../../../../../shared/membership.model';
import { ActiveUserService } from '../../../../../active-user.service';
import { Session } from '../../../../../shared/session.model';

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
              private activeUser: ActiveUserService,
              private activeProject: ActiveProjectService,
              private salesList: SalesListService,
              private membershipService: MembershipService) {
    super();

    this.activeProject.project.first().subscribe(project => {
      this.membershipService.getAllForProject(project.id).map(memberships => {
        return memberships.filter(membership => membership.teamMembers.length);
      }).subscribe(memberships => {
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

  /**
   * Adds an active session to a membership.
   */
  private setActiveSession(session: Session) {
    const membership = this.snapshot.find(item => item.id === session.membershipId);
    membership.activeSession = session;
    this.updateFromSnapshot();
  }

  /**
   * Removes an active session from a membership.
   */
  private removeActiveSession(session: Session) {
    const membership = this.snapshot.find(item => item.id === session.membershipId);
    membership.activeSession = null;
    this.updateFromSnapshot();
  }
}
