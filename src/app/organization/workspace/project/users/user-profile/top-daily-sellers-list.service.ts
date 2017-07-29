import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { TopDailySeller } from '../../wall-of-fame/shared/top-daily-seller.model';
import { ActiveMembershipService } from '../../../active-membership.service';
import { ObservableResourceList } from '../../../../../core/sockets/observable-resource-list';
import { TopDailySellerService } from '../../../shared/top-daily-seller.service';
import { SelectedMembershipService } from './selected-membership.service';

@Injectable()
export class TopDailySellersListService extends ObservableResourceList implements OnDestroy {

  /**
   * The observable list of memberships.
   */
  readonly sellers: Observable<TopDailySeller[]> = this.subject.asObservable();

  /**
   * Constructs the service.
   */
  constructor(private selectedMembership: SelectedMembershipService,
              private topDailySellerService: TopDailySellerService) {
    super();

    this.selectedMembership.membership.first().subscribe(membership => {
      this.paginator.subscribe(limit => {
        this.pagination(this.topDailySellerService.getForMembership(membership.id, limit, this.cursor))
            .subscribe(sales => this.add(sales));
      });
    });
  }

  /**
   * Destroys the service.
   */
  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
