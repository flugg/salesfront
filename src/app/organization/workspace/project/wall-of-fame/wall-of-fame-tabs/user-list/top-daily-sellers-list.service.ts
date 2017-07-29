import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TopDailySeller } from '../../shared/top-daily-seller.model';
import { ActiveProjectService } from '../../../../shared/active-project.service';
import { ObservableResourceList } from '../../../../../../core/sockets/observable-resource-list';
import { TopDailySellerService } from '../../../../shared/top-daily-seller.service';

@Injectable()
export class TopDailySellersListService extends ObservableResourceList implements OnDestroy {

  /**
   * The observable list of memberships.
   */
  readonly sellers: Observable<TopDailySeller[]> = this.subject.asObservable();

  /**
   * Constructs the service.
   */
  constructor(private activeProject: ActiveProjectService,
              private topDailySellerService: TopDailySellerService) {
    super();

    this.activeProject.project.first().subscribe(project => {
      this.paginator.subscribe(limit => {
        this.pagination(this.topDailySellerService.get(project.id, limit, this.cursor))
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
