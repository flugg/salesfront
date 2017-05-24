import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import * as moment from 'moment';

import { ObservableResourceList } from '../../../../../../core/sockets/observable-resource-list';
import { SocketApiService } from '../../../../../../core/sockets/socket-api.service';
import { SaleService } from '../../../../shared/sale.service';
import { MembershipService } from '../../../../../shared/membership.service';
import { ActiveProjectService } from '../../../../shared/active-project.service';
import { SalesListService } from '../sales-list.service';
import { Membership } from '../../../../../shared/membership.model';
import { Sale } from '../../../../shared/sale.model';

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
          this.set(memberships.map(membership => {
            membership.sales = sales.filter(sale => sale.membershipId === membership.id);
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
   * Sets the observable list of resources to the current snapshot.
   */
  protected updateFromSnapshot() {
    this.snapshot.sort((a, b) => {
      if (a.sales.length > b.sales.length) {
        return -1;
      } else if (a.sales.length < b.sales.length) {
        return 1;
      } else {
        return 0;
      }
    });

    super.updateFromSnapshot();
  }

  /**
   * Adds a sale to the respecting membership in the list.
   */
  private addSale(sale: Sale) {
    this.snapshot.find(membership => membership.id === sale.membershipId).sales.push(sale);
    this.updateFromSnapshot();
  }
}
