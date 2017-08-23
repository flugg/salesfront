import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import * as moment from 'moment';

import { ObservableResource } from '../../core/observable-resource';
import { SocketApiService } from '../../core/socket-api.service';
import { SaleService } from '../../core/services/sale.service';
import { ActiveMembershipService } from '../../organization/active-membership.service';

@Injectable()
export class SalesTodayService extends ObservableResource implements OnDestroy {
  readonly value: Observable<number> = this.subject.asObservable();

  constructor(private sockets: SocketApiService,
              private saleService: SaleService,
              private activeMembershipService: ActiveMembershipService) {
    super();

    this.activeMembershipService.membership.first().subscribe(membership => {
      this.saleService.getForMember(membership.id, moment().startOf('day'), moment().endOf('day')).subscribe(sales => {
        this.set(sales.length);
      });

      this.sockets.listenForUser(membership.userId, {
        'sale_registered': sale => this.addSale(),
        'sale_deleted': sale => this.removeSale()
      }, this);
    });
  }

  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }

  private addSale() {
    this.snapshot = this.snapshot + 1;
    this.updateFromSnapshot();
  }

  private removeSale() {
    this.snapshot = this.snapshot - 1;
    this.updateFromSnapshot();
  }
}