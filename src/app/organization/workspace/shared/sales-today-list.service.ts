import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import * as moment from 'moment';

import { ObservableResourceList } from '../../../core/sockets/observable-resource-list';
import { SocketApiService } from '../../../core/sockets/socket-api.service';
import { SaleService } from './sale.service';
import { ActiveUserService } from '../../active-user.service';
import { ActiveMembershipService } from '../active-membership.service';
import { Sale } from './sale.model';

@Injectable()
export class SalesTodayListService extends ObservableResourceList implements OnDestroy {

  /**
   * The observable sales list.
   */
  readonly sales: Observable<Sale[]> = this.subject.asObservable();

  /**
   * Constructs the service.
   */
  constructor(private sockets: SocketApiService,
              private saleService: SaleService,
              private activeUser: ActiveUserService,
              private activeMembership: ActiveMembershipService) {
    super();

    this.activeMembership.membership.first().subscribe(membership => {
      this.saleService.getForMember(membership.id, moment().startOf('day'), moment().endOf('day')).subscribe(sales => this.add(sales));
    });

    this.activeUser.user.first().subscribe(user => {
      this.sockets.listenForUser(user.id, {
        'sale_registered': sale => this.addSale(sale)
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
   * Adds a sale to the list.
   */
  private addSale(sale: Sale) {
    this.snapshot.push(sale);
    this.updateFromSnapshot();
  }
}